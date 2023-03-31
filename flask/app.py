from flask import Flask, send_from_directory, request, jsonify
from course_functions import general_search
from graph_functions import graphApiCall, majorApiCall
app = Flask(__name__)


@app.route("/api")
def hello():
    return "hello greg :)" 

@app.route("/api/courses/guelph")
def get_courses_guelph():
    return send_from_directory("static", "guelphCourses.json")

@app.route("/api/courses/carleton")
def get_courses_carleton():
    return send_from_directory("static", "carletonCourses.json")

@app.route("/api/courses/waterloo")
def get_courses_waterloo():
    return send_from_directory("static", "waterlooCourses.json")

@app.route("/api/course-search/<uni>")
def course_search_guelph(uni):

    if uni == 'guelph' or uni == 'waterloo' or uni == 'carleton':
        # getting query parameters
        subject = request.args.getlist('subject[]')
        level = request.args.getlist('level[]')
        season = request.args.getlist('season[]')
        weight = request.args.getlist('weight[]')

        # getting data given search information
        search_data = general_search(subject, level, season, weight, uni)
        response = jsonify(search_data)

        # fixing cors :)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        response = jsonify({'error': 'university does not exist'})

        # fixing cors :)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
@app.route("/api/graph")
def get_graph():
    # getting query parameters
    uni = request.args.get('university')
    subject = request.args.get('subject')

    print(uni, subject)
    
    # fixing cors :)
    graphData = graphApiCall(subject, uni)
    response = jsonify(graphData)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/graph-major")
def get_graphMajor():
    # getting query parameters
    major = request.args.get('major')

    # fixing cors 🙂
    graphData = majorApiCall(major)
    response = jsonify(graphData)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0')
