
import React from 'react';
import "./css/AllQuestions.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AllQuestions() {
    return (
        <div className="all-questions">
            <div className="all-questions-container">
                <div className="all-questions-left">
                    <div className="all-options">
                        <div className="all-option">
                            <p>0</p>
                            <span>votes</span>
                        </div>
                        <div className="all-option">
                            <p>0</p>
                            <span>answers</span>
                        </div>
                        <div className="all-option">
                            <small>2 views</small>
                        </div>
                    </div>
                </div>
                <div className="question-answer">
                        <a href="/">How to use drag and drop in ant
                        design?e</a>
                    <div
                        style={{
                            width: '90%',
                        }}
                    >
                        <div>
                            How can i pre-load and update for each current MediaItem from an API in ExoPlayer?
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <span className="question-tags">react</span>
                        <span className="question-tags">antd</span>
                        <span className="question-tags">frontend</span>
                    </div>
                    <div className="author">
                    <small>Timestamp</small>
                    <div className="auth-details">
                        <AccountCircleIcon/>
                        <p>User name</p>
                    </div>
                </div>
                </div>
                

                
            </div>
        </div>
    );
}

export default AllQuestions;