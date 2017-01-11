import React from 'react';

export default class Article extends React.Component {
  render() {
  	const { style, imagePath, pdfPath, title, body } = this.props;
    return (
    	<article className={style}>
				<span className="image">
					<img src={imagePath} alt="" />
				</span>
				<a href={pdfPath} target="_blank">
					<h2>{title}</h2>
					<div className="content">
						<p>{body}</p>
					</div>
				</a>
			</article>
    );
  }
}