import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {getDDay} from "./libs/calculator";
import {startOfTomorrow} from "date-fns";

test('renders learn react link', () => {
    render(<App/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

test('calculates d-day', () => {
    let result = getDDay({destDate: new Date()})
    expect(result).toBe(0)
    result = getDDay({destDate: startOfTomorrow()});
    expect(result).toBe(1)
})
