import React from 'react';
import { mount } from 'enzyme';
import QAutoComplete from "./QAutoComplete";

const mockData = [
    {
        label: "Test",
        value: "test-1"
    },
    {
        label: "Test 2",
        value: "test-2"
    }
];

describe('QAutoComplete', () => {

    let autoComplete;

    beforeAll(() => {
        autoComplete = mount(<QAutoComplete
            data={mockData}
        />);
    });

    test('renders input', () => {
        expect(autoComplete.find('input').length).toBe(1);
    });

    test('sets input value correctly', () => {
        const inputValue = "Test 2";
        autoComplete.instance().setState({
            inputValue
        });
        expect(autoComplete.find('input').instance().value).toBe(inputValue);
    });

    test('makes drop down list visible on input focus', (done) => {
        autoComplete.find('input').prop('onFocus')({
            target: autoComplete.find('input').instance()
        });
        setTimeout(() => {
            expect(autoComplete.find('.auto-complete-dropdown-list').instance().parentNode.style.display).toEqual('block');
            done();
        }, 0);
    });

    test('renders dropdown list', () => {
        expect(autoComplete.find('.auto-complete-dropdown-list').length).toBe(1)
    });

    test('renders dropdown list items correctly', () => {
        expect(autoComplete.find('.auto-complete-dropdown-list-item').length).toBe(mockData.length)
    });

    test('filters dropdown list correctly on input value change', (done) => {
        const inputValue = "Test 2";
        autoComplete.instance().setState({
            inputValue
        }, () => {
            autoComplete.update();
            expect(autoComplete.find('.auto-complete-dropdown-list-item').length).toBe(1);
            expect(autoComplete.find('.auto-complete-dropdown-list-item').at(0).text()).toBe(inputValue);
            done();
        });
    });

});