import  { useState } from 'react';

const CollapsibleText = () => {
  const fakeData = [
    { title: 'SERVICE hospitalier', content: 'a propos ..' },
    { title: 'SERVICE non hospitalier', content: 'a propos ..' },
    { title: 'PLATEAU technique ', content: 'a propos ..' },
   
  ];

  const [collapsedItems, setCollapsedItems] = useState(Array(fakeData.length).fill(true));

  const toggleCollapse = (index) => {
    const newCollapsedItems = [...collapsedItems];
    newCollapsedItems[index] = !newCollapsedItems[index];
    setCollapsedItems(newCollapsedItems);
  };

  return (
    <div  id="accordion">
      <div className='container'>
      <h4 >Notre SERVICES </h4>
        {fakeData.map((item, index) => (
          <div className="card shadow m-2" key={index}>
            <div className="card-header" onClick={() => toggleCollapse(index)} style={{ cursor: 'pointer' }}>
              <h5 className="mb-2 mt-2">
                <button
                  className={`btn ${collapsedItems[index] ? '' : 'collapsed'}`}
                  data-toggle="collapse"
                  data-target={`#collapse${index}`}
                  aria-expanded={collapsedItems[index] ? 'true' : 'false'}
                  aria-controls={`collapse${index}`}
                >
                  <i className={`bi ${collapsedItems[index] ? 'bi-node-plus-fill' : 'bi-node-minus-fill'}`} /> {item.title}
                </button>
              </h5>
            </div>
            <div
              id={`collapse${index}`}
              className={`m-2 collapse ${collapsedItems[index] ? '' : 'show'}`}
              aria-labelledby={`heading${index}`}
              data-parent="#accordion"
            >
              <div className="card-body m-2">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollapsibleText;
