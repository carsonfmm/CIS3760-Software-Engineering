import React from 'react';
import renderer from 'react-test-renderer';
import SelectColumn from "../components/courseSearch/selectColumn";
import { MemoryRouter } from "react-router-dom";

test('Testing selectColumn no data passed in', () => {
    const component = renderer.create(
        <MemoryRouter>
            <SelectColumn 
                subjects={[]}
                selectedValues={[[], [], [], [], []]}
                subjectOnChange={undefined}
                yearOnChange={undefined}
                weightOnChange={undefined}
                seasonOnChange={undefined}
                locationOnChange={undefined}
                buttonOnClick={undefined}
            />
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Testing selectColumn with one subject passed in', () => {
    const component = renderer.create(
        <MemoryRouter>
            <SelectColumn 
                subjects={["ACCT"]}
                selectedValues={[[], [], [], [], []]}
                subjectOnChange={undefined}
                yearOnChange={undefined}
                weightOnChange={undefined}
                seasonOnChange={undefined}
                locationOnChange={undefined}
                buttonOnClick={undefined}
            />
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Testing selectColumn with all guelph subjects passed in', () => {
    const subjects = ["ACCT", "AGR", "ANSC", "ANTH", "ARAB", "ARTH", "ASCI", "BIOC", "BIOL", "BIOM", "BOT", "BUS", "CHEM", "CHIN", "CLAS", "COOP", "CIS", "CROP", "CTS", "ECON", "ENGG", "ENGL", "EDRD", "ENVM", "ENVS", "EQN", "EURO", "XSEN", "FRHD", "FIN", "FOOD", "FARE", "FREN", "GEOG", "GERM", "GREK", "HIST", "HORT", "HTM", "HK", "HROB", "HUMN", "IES", "INDG", "IBIO", "IEAF", "IPS", "ISS", "UNIV", "IDEV", "ITAL", "JLS", "LARC", "LAT", "LING", "MGMT", "MCS", "MATH", "MICR", "MCB", "MBG", "MUSC", "NANO", "NEUR", "NUTR", "ONEH", "OAGR", "PATH", "PHIL", "PHYS", "PBIO", "POLS", "POPM", "PORT", "PSYC", "REAL", "SOC", "SOAN", "SPAN", "STAT", "SART", "THST", "TOX", "VETM", "WMST", "ZOO"]
    const component = renderer.create(
        <MemoryRouter>
            <SelectColumn 
                subjects={subjects}
                selectedValues={[[], [], [], [], []]}
                subjectOnChange={undefined}
                yearOnChange={undefined}
                weightOnChange={undefined}
                seasonOnChange={undefined}
                locationOnChange={undefined}
                buttonOnClick={undefined}
            />
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
