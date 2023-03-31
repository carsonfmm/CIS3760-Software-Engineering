import json

# checking if data matches for each search criteria
def check_data(course, key, criteria):
    if key == "code":
        # looping through list of criteria ['CIS*2750', 'CIS*3110', ...]
        for x in criteria:
            # if criteria matches data in object return true
            if x.lower()[0] == course[key].lower()[0]:
                return True
        # return false if no criteria
        return False
    elif key == "season":
        for x in criteria:
            if x.lower() in course[key].lower():
                return True
        return False
    elif key == "weight":
        for x in criteria:
            if x == "1.25+":
                if float(course[key]) >= 1.25:
                    return True
            else:
                if x.lower() == course[key].lower():
                    return True
        return False
    else:
        for x in criteria:
            if x.lower() == course[key].lower():
                return True
        return False


def general_search(subjects, levels, seasons, weights, univ):
    f = open('static/' + univ + 'Courses.json').read()
    data = json.loads(f)

    ret = []
    for course in data:
        if subjects != []:
            result = check_data(course, "subject", subjects)
            if result == False:
                continue

        if levels != []:
            result = check_data(course, "code", levels)
            if result == False:
                continue

        if seasons != []:
            result = check_data(course, "season", seasons)
            if result == False:
                continue

        if weights != []:
            result = check_data(course, "weight", weights)
            if result == False:
                continue

        ret.append(course)
    
    return ret