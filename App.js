import React, { Component } from 'react';
import { Platform, Text, View, WebView } from 'react-native';
import questionData from './questionData.json';
import katexStyle from './katex/katex-style';
import katexScript from './katex/katex-script';
import { bool, func, object, string } from 'prop-types';

const defaultStyle = {
	height: 40
};

const defaultInlineStyle = `
    html, body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    .katex {
        margin: 0;
        display: flex;
    }
`;

export default class App extends Component {
	static propTypes = {
		expression: string,
		displayMode: bool,
		throwOnError: bool,
		errorColor: string,
		inlineStyle: string,
		macros: object,
		colorIsTextColor: bool,
		onLoad: func,
		onError: func
	};

	static defaultProps = {
		displayMode: false,
		throwOnError: false,
		errorColor: '#f00',
		inlineStyle: defaultInlineStyle,
		style: defaultStyle,
		macros: {},
		colorIsTextColor: false,
		onLoad: () => {},
		onError: () => {}
	};

	render() {
		const { questions } = questionData;
		console.log('QUESTION DATA = ', questionData);

		const { style, onLoad, onError, ...options } = this.props;

		var newData = questionData.questions['0'].question;

		console.log('new DATA = ', newData);

		var questionDataFetch = newData.replace(/(<([^>]+)>)/g, '');

		console.log('PARSED DATA = ', questionDataFetch);

		return (
			<WebView
				style={style}
				source={{
					html: `<!DOCTYPE html>
									<html>
									<head>
									<style>
									${katexStyle}
									</style>
									<script>
									window.onerror = e => document.write(e);
									window.onload = () => katex.render(${JSON.stringify(
										questionDataFetch
									)}, document.body, ${JSON.stringify(
						options
					)});
									${katexScript}
									</script>
									</head>
									<body>
									</body>
									</html>
							`
				}}
				onLoad={onLoad}
				onError={onError}
				renderError={onError}
			/>
		);
	}
}
