import React from 'react'
import './header.css';
import { Box } from '@mui/material';
import {GoCode,GoIssueOpened,GoGitPullRequest,GoPlay,GoProject,GoKey,GoInfo} from 'react-icons/go';

function Header() {

  const listofTabs = [
    { name: "Code", icon: GoCode },
    { name: "Issues", icon: GoIssueOpened },
    { name: "Pull Requests", icon: GoGitPullRequest },
    { name: "Actions", icon: GoPlay },
    { name: "Projects", icon: GoProject },
    { name: "Security", icon: GoKey },
    { name: "Insights", icon: GoInfo },
  ];
    
	return (
			<Box className="header-box" color="white"
				bgcolor="#e4e7e" p={1}>
				<div className='header-container'>
      <div className="header-top">
        <div className="left">
          <p>facebook / react</p>
          <button className='public'>Public</button>
        </div>
        <div className="right">
          <button>Watch 6.7k</button>
          <button>Fork 40.2k</button>
          <button>Star 195k</button>
        </div>
      </div>
      <div className="header-bottom">
        <ul>
          {listofTabs.map((tab,idx) => (
            <li key={idx} > <tab.icon /> {tab.name}</li>
          ))}
        </ul>
      </div>
    </div>
    <hr className='line'/>

			</Box>
	);   
}

export default Header