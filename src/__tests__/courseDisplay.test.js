import React from 'react';
import renderer from 'react-test-renderer';
import CourseDisplay from "../components/courseSearch/courseDisplay";
import { MemoryRouter } from "react-router-dom";

test('Testing courseSearch no items selected', () => {
    const component = renderer.create(
        <MemoryRouter>
            <CourseDisplay loading={false} searchResults={[]}/>
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Testing courseSearch with one course passed in', () => {
    const testObj = {"code":"1220","coreq":"None","department":"Department of Management","description":"This introductory course is designed to develop a foundational understanding of current accounting principles and their implication for published financial reports of business enterprises. It builds the base of knowledge and understanding required to succeed in more advanced study of accounting. The course approaches the subject from the point of view of the user of accounting information rather than that of a person who supplies the information.","equate":"None","id":0,"location":"Guelph","name":"ACCT*1220","offerings":"Also offered through Distance Education format.","per_week":"(LEC: 3)","prereq":{"ors":[],"req":[]},"prereq_text":"None","restrictions":"ACCT*2220. This is a Priority Access Course. Enrolment may be restricted to particular programs or specializations. See department for more information.","season":"F W","subject":"ACCT","title":"Introductory Financial Accounting","weight":"0.50"}
    const component = renderer.create(
        <MemoryRouter>
            <CourseDisplay loading={false} searchResults={[testObj]}/>
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Testing courseSearch with multiple courses passed in', () => {
    const testObj = [{"code":"1220","coreq":"None","department":"Department of Management","description":"This introductory course is designed to develop a foundational understanding of current accounting principles and their implication for published financial reports of business enterprises. It builds the base of knowledge and understanding required to succeed in more advanced study of accounting. The course approaches the subject from the point of view of the user of accounting information rather than that of a person who supplies the information.","equate":"None","id":0,"location":"Guelph","name":"ACCT*1220","offerings":"Also offered through Distance Education format.","per_week":"(LEC: 3)","prereq":{"ors":[],"req":[]},"prereq_text":"None","restrictions":"ACCT*2220. This is a Priority Access Course. Enrolment may be restricted to particular programs or specializations. See department for more information.","season":"F W","subject":"ACCT","title":"Introductory Financial Accounting","weight":"0.50"},
                     {"code":"4230","coreq":"None","department":"Department of Management","description":"This course provides advanced coverage of management accounting concepts and the application of management accounting information for managerial decision-making. This course extends the concepts covered in intermediate management accounting and also integrates pertinent situational problems from other functional areas of enterprises such as global trade and process controls.","equate":"BUS*4230","id":9,"location":"Guelph","name":"ACCT*4230","offerings":"None","per_week":"(LEC: 3)","prereq":{"ors":[["ACCT*3230","BUS*3230"]],"req":[]},"prereq_text":"ACCT*3230 or BUS*3230","restrictions":"This is a Priority Access Course. Enrolment may be restricted to particular degrees or programs. See the department for more information.","season":"W","subject":"ACCT","title":"Advanced Management Accounting","weight":"0.50"}]

    const component = renderer.create(
        <MemoryRouter>
            <CourseDisplay loading={false} searchResults={testObj}/>
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
