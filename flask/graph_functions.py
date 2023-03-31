#!/usr/bin/env python3
import json
import sys
import re
import os

#node_colors = ["#D6D9CE", "#F3DAD8", "#F4C3C2", "#C6B3D0", "#A6DAFF"]
#node_colors = ["#A6DAFF", "#F3DAD8", "#F4C3C2", "#C6B3D0", "#D6D9CE"]
#node_colors = ["#C51C1C", "#E6157D", "#ff2b75", "#AD15E6", "#8017FE"]
node_colors = ["#D444FD", "#913DE3", "#784FFA", "#3D44E3", "#447CFD", "#447CFD", "#447CFD", "#447CFD"]
edge_colors = ['#03dac5', '#f78aff', '#ffdb26', 'purple', 'brown', 'orange', 'grey']
# graph definition

# set of currently added nodes into graph
graphed = set()

# hashset of course json objects
graphSet = {}
courseSet = {}
edgeNumber = 0
edgeList = []
coursesList = []

currentDirectory = os.getcwd()
numFirst = [0,0,0,0,0,0,0,0,0] # number of each level of course


def populateVETM(course, phaseCourses):
    for phase in getPhases(course['prereq'], phaseCourses):
        addEdge(phase, course['name'])


# class to hold phase courses
class phases(object):
    phase1 = []
    phase2 = []
    phase3 = []
    phase4 = []

    def __init__(self, phase1, phase2, phase3, phase4):
        self.phase1 = phase1
        self.phase2 = phase2
        self.phase3 = phase3
        self.phase4 = phase4


# function to get the phases for a course
def getPhases(prereq, phaseCourses):
    if '1' in prereq:
        return phaseCourses.phase1
    elif '2' in prereq:
        return phaseCourses.phase2
    elif '3' in prereq:
        return phaseCourses.phase3
    else:
        return []


# single subject search
def subjectSearch(option, course_data, uni):
    # loop through all courses
    for course in course_data:
        # check if subject matches command line arg
        if course['subject'].upper() == option:
            populate_graph(course, uni)


def phaseCourse(course_data):
    arrays = [[], [], [], []]
    for course in course_data:
        if 'DVM Phase' in course['season']:
            arrays[int((course['season'])[-1:]) - 1].append(course['name'])
    phaseCourses = phases(arrays[0], arrays[1], arrays[2], arrays[3])
    return phaseCourses


def populateCourseSet(course_data):
    for course in course_data:
        courseSet[course['name']] = course


def graphApiCall(option, uni):
    # set of currently added nodes into graph
    global graphed, edgeList, coursesList, courseSet, edgeNumber, numFirst
    
    graphed = set()

    # hashset of course json objects
    courseSet = {}
    edgeNumber = 0
    edgeList = []
    coursesList = []
    numFirst = [0,0,0,0,0,0,0,0,0] # number of each level of course

    #return dict, jsonify on app.py
    filename = "static/"+ uni.lower() + "Courses.json"
    f = open(filename, "r").read()
    course_data = json.loads(f)
    subjectSearch(option, course_data, uni)
    obj = {
        "nodeList": coursesList,
        "edgeList": edgeList
    }
    return obj

def majorApiCall(option):
    global graphed, edgeList, coursesList, courseSet, edgeNumber, numFirst  
    graphed = set()
    # hashset of course json objects
    courseSet = {}
    edgeNumber = 0
    edgeList = []
    coursesList = []
    numFirst = [0,0,0,0,0,0,0,0,0] # number of each level of course

    #return dict, jsonify on app.py
    filename = "static/guelphCourses.json"
    f = open( filename, "r").read()
    course_data = json.loads(f)
    handleMajors(option,course_data)
    obj = {
        "nodeList":coursesList,
        "edgeList":edgeList
    }
    return obj


def addNode(name, colour, first):
    colors_index = int(re.findall(r'[0-9]', name)[0])

    obj ={
        "id": name,
        "style": {
            "background": node_colors[colors_index],
            "color": 'white',
            "border": '1px solid #222138',
        },
        "data": { "label": name }, 
        "position": {"x": 0, "y": 0},   
    }
    #add to node list
    numFirst[first-1]= numFirst[first-1]+1
    coursesList.append(obj)
    #add to courseSet
    graphSet[name] = obj


def addEdge(source, dest, colour, style):
    global edgeNumber
    # check if both dest and source exist
    # if not: addNode with them
    if(source not in graphSet):
        print(source)
        courseYear= re.findall(r'[0-9]{1}', source)[0]
        addNode(source, node_colors[courseYear], courseYear)

    if(dest not in graphSet):
        print(source)
        courseYear= re.findall(r'[0-9]{1}', source)[0]
        addNode(dest, node_colors[courseYear], courseYear)

    #make edge object connecting the two  
    eName = "e"+ str(edgeNumber)
    obj ={
        "id": eName,
        "source": source,
        "target": dest,
        "animated": "true" if style == "dashed" else None,
        "style":{
            "stroke": colour
        }
    }
    #add it to edge list
    edgeList.append(obj)
    #add it to graphSet so we can keep track of what nodes exist
    courseSet[eName] = obj
    
    edgeNumber+=1


# adds everything to graph from req and ors in course object
def populate_graph(course, uni):

    # calculating course level to make node correct color
    colors_index = int(course['code'][0]) - 1
    # add current course node to graph
    addNode(course['name'], node_colors[colors_index], colors_index+1)
    # add course to set
    graphed.add(course['name'])

    # special case for VETM courses due to DVM Phases
    prereqs = course['prereq']
    for req in prereqs['req']:
        # if course in set add edge
        if req in graphed:
            addEdge(req, course['name'],"#fffff","filled")
        # if course not in set, create node, add to set, and add edge
        else:
            index = int(course['code'][0]) - 1
            addNode(req, node_colors[index], index+1)
            graphed.add(req)
            addEdge(req, course['name'],"#fffff","filled")

    for num, ors in enumerate(prereqs['ors']):
        for req in ors:
            # if course in set add edge
            edgeStyle = "dashed"
            orColor = edge_colors[num]
            if(len(ors) < 2):
                orColor = "#fffff"
                edgeStyle = "solid"

            if req in graphed:
                addEdge(req, course['name'], orColor, edgeStyle)
            # if course not in set, create node, add to set, and add edge
            else:
                index = int(course['code'][0]) - 1
                addNode(req, node_colors[index],index+1)
                graphed.add(req)
                addEdge(req, course['name'], orColor, edgeStyle)


def handleMajors(option, course_data):
    flag = "-MM"
    # gets data for each major
    f1 = open("static/guelphMajors.json", "r").read()
    majorData = json.loads(f1)
    # formulates nodes for final graph
    populateCourseSet(course_data)
    majorSearch(option, majorData, course_data, flag)    


def majorSearch(option, majorData, course_data, flag):
    courses = []
    for major in majorData:  # for each major
        if major['majorCode'].upper() == option:  # check if this is the one we are looking for
            majorCourses = major['courseList']
            for course in majorCourses:  # makes list of course objects from the original scraper
                if(course in courseSet):
                    courses.append(courseSet[course])
            # gives list of course objects for populateMajorGraph to enter to the pdf
            populateMajorGraph(courses, flag)


def populateMajorGraph(courses, flag):
    uni = "guelph"
    if(flag == "-MM"):  # 2 pass approach to ensure all edges appear and no external nodes are included
        for course in courses:
            populate_major_mini_graph(course)
        for course in courses:
            add_edges_major_mini(course)



def populateCourseSet(course_data):
    for course in course_data:
        courseSet[course['name']] = course

def populate_major_mini_graph(course):
    # calculating course level to make node correct color
    colors_index = int(course['code'][0]) - 1
    # add current course node to graph
    addNode(course['name'], node_colors[colors_index], colors_index+1)
    graphed.add(course['name'])
    # special case for VETM courses due to DVM Phases, does not have full support on major mini

def add_edges_major_mini(course):
    uni = "guelph"
    prereqs = course['prereq']
    for req in prereqs['req']:
        # if course in set add edge
        if req in graphed:
            addEdge(req, course['name'],"#fffff","filled")

    for num, ors in enumerate(prereqs['ors']):
        for req in ors:
            # if course in set add edge
            edgeStyle = "dashed"
            orColor = edge_colors[num]
            if(len(ors) < 2):
                orColor = "#fffff"
                edgeStyle = "solid"
            if req in graphed:
                addEdge(req, course['name'], orColor, edgeStyle)

