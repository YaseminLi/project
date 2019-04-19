import React from 'react';
const PCHotNews=require('../css/pc_hotNews.css')
export default class PCFooter extends React.Component{
    render() {
        return (
            <div className={PCHotNews.pc_hotNews}>
                <div className={PCHotNews.hotContent}>
                <h5>热点内容……</h5></div>
                <div className={PCHotNews.hotTopic}>
                <img src='https://img3.doubanio.com/view/dale-online/dale_ad/public/da0cf77744ac985.jpg'/>
                <h5>热门话题……</h5>
                </div>
            </div>
        )
    }
}