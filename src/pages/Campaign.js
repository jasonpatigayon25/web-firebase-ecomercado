import React from 'react';

const Campaign = () => {
  const campaigns = [
    {
      id: 1,
      title: 'Plant a Tree Campaign',
      details: 'Join us in planting trees to combat deforestation and promote a greener environment.',
      link: 'https://example.com/plant-a-tree-campaign',
    },
    {
      id: 2,
      title: 'Zero Waste Challenge',
      details: 'Take part in our Zero Waste Challenge to reduce waste and adopt sustainable practices in your daily life.',
      link: 'https://example.com/zero-waste-challenge',
    },
   
  ];

  return (
    <div className="campaign">
      <h2>Campaign</h2>
      <p>Join a campaign for promoting sustainability and saving the earth and environment.</p>
      <div className="campaign-list">
        {campaigns.map((campaign) => (
          <div className="campaign-item" key={campaign.id}>
            <h3>{campaign.title}</h3>
            <p>{campaign.details}</p>
            <a href={campaign.link} target="_blank" rel="noopener noreferrer">
              Join Campaign
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaign;