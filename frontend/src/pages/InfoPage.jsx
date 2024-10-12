import React from 'react';

const InfoPage = () => {
  return (
    <div className="outer-placeholder">
      <div className="temp-inner-placeholder">
        <h1>Info Page</h1>
        <p style="text-align: left;">
          When a user logs into Prudentia they immediately accesses a centralized dashboard displaying all necessary return data in a single interface. 
          The user can review, comment, and cross-check data without switching between tools. This streamlines their workflow, reduces errors, and saves time.
        </p>
        <p style="text-align: left;">
          Prudentia consolidates all prudential return data in a single dashboard. 
          Supervisors can review quarterly return data for multiple institutions. 
          One location, one tool being the benefit.
        </p>
        <p style="text-align: left;">
          Prudentia is a secure integrated environment for completing PRs. 
          The PR reviews analyze key measures across 5 quarters and document their findings. 
          The benefit being that the supervisor can add comments, notes and analysis directly linked to the data.
        </p>
        <p style="text-align: left;">
          Prundentia facilitates a rigorous review and and approval process requiring at least two reviewers to sign-off on on review. 
          Quality assurance reviews can be confident that reviews have being managed by more than one person.
        </p>
      </div>
    </div>
  );
};

export default InfoPage;