import React, { useEffect, useState, useMemo } from 'react';
import snakeCase from 'lodash-es/snakeCase';
import average from 'lodash-es/mean';
import { Table, buildCell } from './components';
import './App.scss';
import { listQuestions } from './api'

const buidlAggregationColumnCellData = value => buildCell(value === 0 ? value.toString() : value.toFixed(1));

function App() {
	const [questions, setQuestions] = useState();

	useEffect(() => {
		listQuestions().then(setQuestions)
	}, [])

	const [columns, data] = useMemo(() => {
		const data = [];
		const columns = [{
			key: 'question',
			title: '',
		},{
			key: 'all',
			title: 'All Employees',
		}];

		// Dictionary to store scores by department {[key: string]: number[]}
		const allQuestionsTotals = {};
		
		const departments = new Set();
		(questions || []).map(question => {
			const row = {
				question: buildCell(question.title),
			};

			const scores = question.answers.map(answer => {
				// Create key based on department title
				const key = snakeCase(answer.department);

				// Add score to row
				row[key] = buildCell(answer.score);
				
				// Add score to allQuestionsTotals
				if (!allQuestionsTotals[key]) {
					allQuestionsTotals[key] = [];
				}
				allQuestionsTotals[key].push(answer.score);

				// Make sure department is considered
				departments.add(answer.department);

				return answer.score;
			});
			
			// Calculate average score
			row.all = buidlAggregationColumnCellData(average(scores));

			data.push(row);
		});

		departments.forEach(department => {
			columns.push({
				key: snakeCase(department),
				title: department
			});
		});

		const allQuestionsTotalsRow = {
			question: buildCell('All questions'),
		};
		const allQuestionsScores = Object.keys(allQuestionsTotals).map(key => {
			const av = average(allQuestionsTotals[key]);
			allQuestionsTotalsRow[key] = buidlAggregationColumnCellData(av);
			return av;
		});
		allQuestionsTotalsRow.all = buidlAggregationColumnCellData(average(allQuestionsScores));

		return [columns, [allQuestionsTotalsRow, ...data]];
	}, [questions]);
	
	return (
		<div className="App">
			{questions
				? <Table columns={columns} data={data} />
				: <div>Loading</div>
			}
		</div>
	);
}

export default App;
