import React from 'react';
import { render } from 'react-dom';
import Article from './components/article';
import data from './data/marshuang.json';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data,
			originalData: data,
			query: '',
			rawTextList: []
		};
	}

	componentDidMount() {
		const rawTextList = require('./data/rawText.json');
		this.setState({
			rawTextList
		})
	}

	handleInput = (event) => {
		this.setState({
			query: event.target.value
		});
	}

	onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  onKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.setState({ query: '' });
    }
  }

  handleSearch = () => {
  	const { rawTextList, query, data, originalData } = this.state;
  	if (query === '') {
  		this.setState({
  			data: originalData
  		})
  	} else {
  		const filteredRawTextList = rawTextList.map((e, i) => e.rawText.includes(query) ? e.rawText.substring(0,8) : null)
			.filter(e => !!e);

			const filteredData = originalData.filter(d => filteredRawTextList.includes(d.body.substring(0, 8)));
			this.setState({ data: filteredData });
  	}
  }

  render() {
  	const articles = this.state.data.map(article =>
	  	<Article
	  			key={article.body}
	    		style={article.style}
	    		imagePath={article.imagePath}
	    		pdfPath={article.pdfPath}
	    		title={article.title}
	    		body={article.body}
	    	/> )
    return (
    	<div>
    		<input 
    			type="text" 
    			placeholder="搜尋質詢內容" 
    			value={this.state.query}
    			onChange={this.handleInput}
    			onKeyPress={this.onKeyPress}
    			onKeyDown={this.onKeyDown}
  			/> 
    		<br />
    		<p style={{ marginBottom: 0 }}> {this.state.data.length} 個質詢稿 </p>
	    	<section className="tiles">
	    		{articles}
	    	</section>
    	</div>
    );
  }
}

render(<App />, document.getElementById('articles'));