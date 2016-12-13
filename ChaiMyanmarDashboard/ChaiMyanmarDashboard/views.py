"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template, jsonify, request
from ChaiMyanmarDashboard import app
import pypyodbc
from pprint import pprint

"""Database Connection String"""
connectionString = ''

"""Cache query results"""
cachedResults = {}

"""Predefined SQL commands"""
avgAgePerStateCommand = 'SELECT [MorGResidingRegionState], AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] GROUP BY [MorGResidingRegionState];'
avgAgePerTownCommand = 'SELECT [MorGResidingGTownShip], AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] GROUP BY [MorGResidingGTownShip];'
avgAgePerProvinceCommand = 'SELECT [ProvinceName],AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] GROUP BY [ProvinceName];'
avgAgePerFacilityNameCommand = 'SELECT [FacilityName],AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] GROUP BY [FacilityName];'
avgAgePerFacilityTypeCommand = 'SELECT [FacilityType],AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] GROUP BY [FacilityType];'

eidTestResultTotalCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] GROUP BY [FinalReportResult];'
eidTestResultAIDSTFacilityTypeCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'AIDS/STD Team\' GROUP BY [FinalReportResult];'
eidTestResultAMIFacilityTypeCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'AMI\' GROUP BY [FinalReportResult];'
eidTestResultDisHFacilityTypeCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'District Hospital\' GROUP BY [FinalReportResult];'
eidTestResultGenHFacilityTypeCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'General Hospital\' GROUP BY [FinalReportResult];'
eidTestResultMSFHFacilityTypeCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'MSF-H\' GROUP BY [FinalReportResult];'
eidTestResultNHLFacilityTypeCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'National Health Laboratory\' GROUP BY [FinalReportResult];'
eidTestResultSpHFacilityTypeCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'Specialist Hospital\' GROUP BY [FinalReportResult];'
eidTestResultSRHFacilityTypeCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'State/Regional Hospital\' GROUP BY [FinalReportResult];'
eidTestResultTHFacilityTypeCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'Township Hospital\' GROUP BY [FinalReportResult];'

avgTatTotalCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery];'
avgTatAIDSTFacilityTypeCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'AIDS/STD Team\';'
avgTatAMIFacilityTypeCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'AMI\';'
avgTatDisHFacilityTypeCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'District Hospital\';'
avgTatGenHFacilityTypeCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'General Hospital\';'
avgTatMSFHFacilityTypeCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'MSF-H\';'
avgTatNHLFacilityTypeCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'National Health Laboratory\';'
avgTatSpHFacilityTypeCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'Specialist Hospital\';'
avgTatSRHFacilityTypeCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'State/Regional Hospital\';'
avgTatTHFacilityTypeCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityType] = \'Township Hospital\';'

trackSampleCommand = 'SELECT [ID], [FinalReportResult],[SampleCollectedDate], [SampleShipmentDate],[RecievedDate],[RegistrationDate], [FinalReportDate],[DispachedDate], DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate]),DATEDIFF(day,[SampleShipmentDate],[RecievedDate]),DATEDIFF(day,[RecievedDate],[RegistrationDate]),DATEDIFF(day,[RegistrationDate],[FinalReportDate]), DATEDIFF(day,[FinalReportDate],[DispachedDate]) FROM [dbo].[EIDSummery];'

avgAgeNHLCommand = 'SELECT AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] WHERE [Lab] = \'NHL\';'
avgAgePHLCommand = 'SELECT AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] WHERE [Lab] = \'PHL\';'
avgAgeUNIONCommand = 'SELECT AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] WHERE [Lab] = \'UNION\';'

eidTestResultNHLLabCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [Lab] = \'NHL\' GROUP BY [FinalReportResult];'
eidTestResultPHLLabCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [Lab] = \'PHL\' GROUP BY [FinalReportResult];'
eidTestResultUNIONLabCommand = 'SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [Lab] = \'UNION\' GROUP BY [FinalReportResult];'

avgTatNHLLabCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [Lab] = \'NHL\';'
avgTatPHLLabCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [Lab] = \'PHL\';'
avgTatUNIONLabCommand = 'SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [Lab] = \'UNION\';'


@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now,
    )

@app.route('/plot')
def plot():
    """Renders the plot page."""

    connection = pypyodbc.connect(connectionString)
    
    cursor = connection.cursor()

    cachedResults['avgAgePerState'] = runQuery(cursor, avgAgePerStateCommand)
    cachedResults['avgAgePerTown'] = runQuery(cursor, avgAgePerTownCommand)
    cachedResults['avgAgePerProvince'] = runQuery(cursor, avgAgePerProvinceCommand)
    cachedResults['avgAgePerFacilityName'] = runQuery(cursor, avgAgePerFacilityNameCommand)
    cachedResults['avgAgePerFacilityType'] = runQuery(cursor, avgAgePerFacilityTypeCommand)

    cachedResults['eidTestResultTotal'] = runQuery(cursor, eidTestResultTotalCommand)
    cachedResults['eidTestResultAIDSTFacilityType'] = runQuery(cursor, eidTestResultAIDSTFacilityTypeCommand)
    cachedResults['eidTestResultAMIFacilityType'] = runQuery(cursor, eidTestResultAMIFacilityTypeCommand)
    cachedResults['eidTestResultDisHFacilityType'] = runQuery(cursor, eidTestResultDisHFacilityTypeCommand)
    cachedResults['eidTestResultGenHFacilityType'] = runQuery(cursor, eidTestResultGenHFacilityTypeCommand)
    cachedResults['eidTestResultMSFHFacilityType'] = runQuery(cursor, eidTestResultMSFHFacilityTypeCommand)
    cachedResults['eidTestResultNHLFacilityType'] = runQuery(cursor, eidTestResultNHLFacilityTypeCommand)
    cachedResults['eidTestResultSpHFacilityType'] = runQuery(cursor, eidTestResultSpHFacilityTypeCommand)
    cachedResults['eidTestResultSRHFacilityType'] = runQuery(cursor, eidTestResultSRHFacilityTypeCommand)
    cachedResults['eidTestResultTHFacilityType'] = runQuery(cursor, eidTestResultTHFacilityTypeCommand)

    cachedResults['avgTatTotal'] = runQuery(cursor, avgTatTotalCommand)
    cachedResults['avgTatAIDSTFacilityType'] = runQuery(cursor, avgTatAIDSTFacilityTypeCommand)
    cachedResults['avgTatAMIFacilityType'] = runQuery(cursor, avgTatAMIFacilityTypeCommand)
    cachedResults['avgTatDisHFacilityType'] = runQuery(cursor, avgTatDisHFacilityTypeCommand)
    cachedResults['avgTatGenHFacilityType'] = runQuery(cursor, avgTatGenHFacilityTypeCommand)
    cachedResults['avgTatMSFHFacilityType'] = runQuery(cursor, avgTatMSFHFacilityTypeCommand)
    cachedResults['avgTatNHLFacilityType'] = runQuery(cursor, avgTatNHLFacilityTypeCommand)
    cachedResults['avgTatSpHFacilityType'] = runQuery(cursor, avgTatSpHFacilityTypeCommand)
    cachedResults['avgTatSRHFacilityType'] = runQuery(cursor, avgTatSRHFacilityTypeCommand)
    cachedResults['avgTatTHFacilityType'] = runQuery(cursor, avgTatTHFacilityTypeCommand)

    cachedResults['trackSample'] = runQuery(cursor, trackSampleCommand)

    cachedResults['avgAgeNHL'] = runQuery(cursor, avgAgeNHLCommand)
    cachedResults['avgAgePHL'] = runQuery(cursor, avgAgePHLCommand)
    cachedResults['avgAgeUNION'] = runQuery(cursor, avgAgeUNIONCommand)

    cachedResults['eidTestResultNHLLab'] = runQuery(cursor, eidTestResultNHLLabCommand)
    cachedResults['eidTestResultPHLLab'] = runQuery(cursor, eidTestResultPHLLabCommand)
    cachedResults['eidTestResultUNIONLab'] = runQuery(cursor, eidTestResultUNIONLabCommand)

    cachedResults['avgTatNHLLab'] = runQuery(cursor, avgTatNHLLabCommand)
    cachedResults['avgTatPHLLab'] = runQuery(cursor, avgTatPHLLabCommand)
    cachedResults['avgTatUNIONLab'] = runQuery(cursor, avgTatUNIONLabCommand)
    """ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO DO: Convert all dates to epoch times !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! """

    connection.close()

    # This is what the result data looks like
    matrix = [
        [1, 5871, 8916, 2868],
        [2, 10048, 2060, 6171],
        [3, 16145, 8090, 8045],
        [4, 990,  940, 6907],
        [5, 450, 430, 5000],
        [6, 100, 10000, 1000],
    ];

    return render_template(
        'plot.html',
        data_arr=matrix,
        )
        
def runQuery(cursor, command):
    cursor.execute(command)

    result = cursor.fetchall()

    resultList = []
    for row in result:
        resultList.append(list(row))

    return resultList

@app.route('/_get_avgAgePerState')
def get_avgAgePerState():
    return jsonify(result=cachedResults['avgAgePerState'])

@app.route('/_get_avgAgePerTown')
def get_avgAgePerTown():
    return jsonify(result=cachedResults['avgAgePerTown'])

@app.route('/_get_avgAgePerProvince')
def get_avgAgePerProvince():
    return jsonify(result=cachedResults['avgAgePerProvince'])

@app.route('/_get_avgAgePerFacilityName')
def get_avgAgePerFacilityName():
    return jsonify(result=cachedResults['avgAgePerFacilityName'])

@app.route('/_get_avgAgePerFacilityType')
def get_avgAgePerFacilityType():
    return jsonify(result=cachedResults['avgAgePerFacilityType'])


@app.route('/_get_eidTestResultTotal')
def get_eidTestResultTotal():
    return jsonify(result=cachedResults['eidTestResultTotal'])

@app.route('/_get_eidTestResultAIDSTFacilityType')
def get_eidTestResultAIDSTFacilityType():
    return jsonify(result=cachedResults['eidTestResultAIDSTFacilityType'])

@app.route('/_get_eidTestResultAMIFacilityType')
def get_eidTestResultAMIFacilityType():
    return jsonify(result=cachedResults['eidTestResultAMIFacilityType'])

@app.route('/_get_eidTestResultDisHFacilityType')
def get_eidTestResultDisHFacilityType():
    return jsonify(result=cachedResults['eidTestResultDisHFacilityType'])

@app.route('/_get_eidTestResultGenHFacilityType')
def get_eidTestResultGenHFacilityType():
    return jsonify(result=cachedResults['eidTestResultGenHFacilityType'])

@app.route('/_get_eidTestResultMSFHFacilityType')
def get_eidTestResultMSFHFacilityType():
    return jsonify(result=cachedResults['eidTestResultMSFHFacilityType'])

@app.route('/_get_eidTestResultNHLFacilityType')
def get_eidTestResultNHLFacilityType():
    return jsonify(result=cachedResults['eidTestResultNHLFacilityType'])

@app.route('/_get_eidTestResultSpHFacilityType')
def get_eidTestResultSpHFacilityType():
    return jsonify(result=cachedResults['eidTestResultSpHFacilityType'])

@app.route('/_get_eidTestResultSRHFacilityType')
def get_eidTestResultSRHFacilityType():
    return jsonify(result=cachedResults['eidTestResultSRHFacilityType'])

@app.route('/_get_eidTestResultTHFacilityType')
def get_eidTestResultTHFacilityType():
    return jsonify(result=cachedResults['eidTestResultTHFacilityType'])


@app.route('/_get_avgTatTotal')
def get_avgTatTotal():
    return jsonify(result=cachedResults['avgTatTotal'])

@app.route('/_get_avgTatAIDSTFacilityType')
def get_avgTatAIDSTFacilityType():
    return jsonify(result=cachedResults['avgTatAIDSTFacilityType'])

@app.route('/_get_avgTatAMIFacilityType')
def get_avgTatAMIFacilityType():
    return jsonify(result=cachedResults['avgTatAMIFacilityType'])

@app.route('/_get_avgTatDisHFacilityType')
def get_avgTatDisHFacilityType():
    return jsonify(result=cachedResults['avgTatDisHFacilityType'])

@app.route('/_get_avgTatGenHFacilityType')
def get_avgTatGenHFacilityType():
    return jsonify(result=cachedResults['avgTatGenHFacilityType'])

@app.route('/_get_avgTatMSFHFacilityType')
def get_avgTatMSFHFacilityType():
    return jsonify(result=cachedResults['avgTatMSFHFacilityType'])

@app.route('/_get_avgTatNHLFacilityType')
def get_avgTatNHLFacilityType():
    return jsonify(result=cachedResults['avgTatNHLFacilityType'])

@app.route('/_get_avgTatSpHFacilityType')
def get_avgTatSpHFacilityType():
    return jsonify(result=cachedResults['avgTatSpHFacilityType'])

@app.route('/_get_avgTatSRHFacilityType')
def get_avgTatSRHFacilityType():
    return jsonify(result=cachedResults['avgTatSRHFacilityType'])

@app.route('/_get_avgTatTHFacilityType')
def get_avgTatTHFacilityType():
    return jsonify(result=cachedResults['avgTatTHFacilityType'])


@app.route('/_get_trackSample')
def get_trackSample():
    return jsonify(result=cachedResults['trackSample'])


@app.route('/_get_avgAgeNHL')
def get_avgAgeNHL():
    return jsonify(result=cachedResults['avgAgeNHL'])

@app.route('/_get_avgAgePHL')
def get_avgAgePHL():
    return jsonify(result=cachedResults['avgAgePHL'])

@app.route('/_get_avgAgeUNION')
def get_avgAgeUNION():
    return jsonify(result=cachedResults['avgAgeUNION'])


@app.route('/_get_eidTestResultNHLLab')
def get_eidTestResultNHLLab():
    return jsonify(result=cachedResults['eidTestResultNHLLab'])

@app.route('/_get_eidTestResultPHLLab')
def get_eidTestResultPHLLab():
    return jsonify(result=cachedResults['eidTestResultPHLLab'])

@app.route('/_get_eidTestResultUNIONLab')
def get_eidTestResultUNIONLab():
    return jsonify(result=cachedResults['eidTestResultUNIONLab'])


@app.route('/_get_avgTatNHLLab')
def get_avgTatNHLLab():
    return jsonify(result=cachedResults['avgTatNHLLab'])

@app.route('/_get_avgTatPHLLab')
def get_avgTatPHLLab():
    return jsonify(result=cachedResults['avgTatPHLLab'])

@app.route('/_get_avgTatUNIONLab')
def get_avgTatUNIONLab():
    return jsonify(result=cachedResults['avgTatUNIONLab'])

"""
@app.route('/_get_result')
def get_result():
    cacheName = request.args.get('cacheName', 0, type=str)

    if cacheName in cachedResults:
        resultsList = cachedResults[cacheName]
    else:
        resultsList = []

    print ('Cached Results:')
    pprint(resultsList)
    print('\n')
    return jsonify(result=resultsList)
"""

@app.route('/contact')
def contact():
    """Renders the contact page."""
    return render_template(
        'contact.html',
        title='Contact',
        year=datetime.now().year,
        message='Your contact page.'
    )

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='Your application description page.'
    )
