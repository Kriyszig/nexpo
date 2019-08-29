let displayView = null;

document.addEventListener('DOMContentLoaded', function() {
  const sectionHdr = document.getElementById('d-ph');
  const sectionDiv = document.getElementById('usertype');
  const preference = localStorage.getItem('usr-preference');

  if(!preference)
  {
    sectionDiv.style.animation = 'scalle 0.5s 1';
    sectionDiv.style.display = 'block';
    sectionHdr.style.animation = 'scalle 0.5s 1';
    sectionHdr.style.display = 'block';

    setTimeout(() => {
      sectionDiv.style.animation = '';
      sectionHdr.style.animation = '';
    }, 500);
  }
});

var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

let p1, p2, totalDist, savings, calories, lastJson, tout = null;

// Takes any integer
function seed(i) {
  m_w = (123456789 + i) & mask;
  m_z = (987654321 - i) & mask;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function random()
{
  m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
  m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
  var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
  result /= 4294967296;
  return result;
}

// replaceAll polyfill
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

const formatQS = (ele) => {
  return ele.replaceAll(' ', '%20').replaceAll('/', '_').replaceAll('(', '%28').replaceAll(')', '%29');
};

const setPreference = () => {
  const sectionDiv = document.getElementById('usertype');
  const value = sectionDiv.options[sectionDiv.selectedIndex].value;
  localStorage.setItem('usr-preference', value);
  sectionDiv.style.display = 'none'; 
  const hDiv = document.getElementById('d-ph');
  hDiv.style.display = 'none'; 
};

const displaySelectBus = () => {
  const busDiv = document.getElementsByClassName('bus-select-wrapper')[0];
  busDiv.style.animation = 'popdown 0.32s 1';
  busDiv.style.animationDirection = 'reverse';
  busDiv.style.display = 'block';
  window.scrollTo(0, 0);
  setTimeout(() => {
    const busDiv = document.getElementsByClassName('bus-select-wrapper')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
  }, 300);
};

const letsPark = () => {
  displayView = 'Parking';
  if(!localStorage.getItem('usr-preference'))
    setPreference();

  const busDiv = document.getElementsByClassName('service-wrapper')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('service-wrapper')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('parking-wrapper')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('parking-wrapper')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
    }, 300);
  }, 250);
};

const searchBuses = () => {
  displayView = 'Bus';
  if(!localStorage.getItem('usr-preference'))
    setPreference();

  const serviceDiv = document.getElementsByClassName('service-wrapper')[0];
  serviceDiv.style.animation = 'popup 0.32s 1';
  setTimeout(() => {
    const serviceDiv = document.getElementsByClassName('service-wrapper')[0];
    serviceDiv.style.display = 'none';
    serviceDiv.style.animation = '';
    window.scrollTo(0, 0);
    displaySelectBus();
  }, 250);
};

const backToSelect = () => {
  displayView = null;
  const busDiv = document.getElementsByClassName('bus-select-wrapper')[0];
  busDiv.style.animation = 'popdown 0.32s 1';
  
  setTimeout(() => {
    const busDiv = document.getElementsByClassName('bus-select-wrapper')[0];
    busDiv.style.display = 'none';
    busDiv.style.animation = '';

    const serviceDiv = document.getElementsByClassName('service-wrapper')[0];
    serviceDiv.style.animation = 'popup 0.32s 1';
    serviceDiv.style.animationDirection = 'reverse';
    serviceDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const serviceDiv = document.getElementsByClassName('service-wrapper')[0];
      serviceDiv.style.animation = '';
      serviceDiv.style.animationDirection = '';
    }, 300);
  }, 290);
};

const submitRoutes = () => {
  const fromDiv = document.getElementsByClassName('bus-selector')[0];
  const toDiv = document.getElementsByClassName('bus-selector')[1];
  const from = fromDiv.options[fromDiv.selectedIndex].value;
  const to = toDiv.options[toDiv.selectedIndex].value;

  if(from == to)
  {
    alert('Walking is the best exercise');
    return;
  }

  seed(fromDiv.selectedIndex * 1000 + toDiv.selectedIndex + 1);

  fetchRoutes(formatQS(from), formatQS(to));
  displayView = 'Loading Screen';
  const busDiv = document.getElementsByClassName('bus-select-wrapper')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('bus-select-wrapper')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('loading-screen-wrapper')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('loading-screen-wrapper')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
    }, 300);
  }, 300);
}

const displayTable = () => {
  displayView = 'Table Display';
  const loadDiv = document.getElementsByClassName('loading-screen-wrapper')[0];
  loadDiv.style.animation = 'popup 0.32s 1';
  loadDiv.style.display = 'block';
  setTimeout(() => {
    const loadDiv = document.getElementsByClassName('loading-screen-wrapper')[0];
    loadDiv.style.animation = '';
    loadDiv.style.display = 'none';

    const displaytable = document.getElementsByClassName('routes-wrapper')[0];
    displaytable.style.animation = 'popdown 0.32s 1';
    displaytable.style.animationDirection = 'reverse';
    displaytable.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const displaytable = document.getElementsByClassName('routes-wrapper')[0];
      displaytable.style.animation = '';
      displaytable.style.animationDirection = '';
    }, 300);
  }, 300);
}

const checkCache = async (gateway) => {
  const cachedval = localStorage.getItem(gateway)
  if(cachedval)
    return JSON.parse(cachedval);

  const res = await fetch(gateway);
  const out = await res.json();
  localStorage.setItem(gateway, JSON.stringify(out));

  return out;
}

const fetchRoutes = async (frm, to) => {
  const apigateway = `https://protov1.herokuapp.com/route/${frm}/${to}`;
  // const apigateway = `https://bbus-in.herokuapp.com/api/v1/search/?from=${frm}&to=${to}&how=Minimum%20Number%20of%20Hops`;
  let out;
  out = await checkCache(apigateway);
  // console.log(out);
  lastJson = out;

  const displaytable = document.getElementById('routes-table');

  // Remove all child nodes from the table before insertion
  let child = displaytable.lastElementChild;
  while (child) {
    displaytable.removeChild(child);
    child = displaytable.lastElementChild;
  }

  let row = displaytable.insertRow(0);
  let h1 = row.insertCell(0);
  let h2 = row.insertCell(1);
  let h3 = row.insertCell(2);
  let h4 = row.insertCell(3);

  h1.textContent = 'From';
  h2.textContent = 'To';
  h3.textContent = 'Buses';
  h4.textContent = 'Duration';

  let breaker = displaytable.insertRow(1);
  breaker.style.height = '2px';
  breaker = breaker.insertCell(0);
  breaker.colSpan = '4';
  breaker.style.backgroundColor = "#DB202C";

  breaker = displaytable.insertRow(0);
  breaker.style.height = '2px';
  breaker = breaker.insertCell(0);
  breaker.colSpan = '4';
  breaker.style.backgroundColor = "#DB202C";

  let rowcount = 3;
  totalDist = 5;
  for(routes in out)
  {
    let distTmp = 0;
    for(let i = 0; i < out[routes].length; ++i)
    {
      row = displaytable.insertRow(rowcount);
      ++rowcount;

      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      for(route in out[routes][i])
      {
        if(route == 'Hop')
          continue;
        else if(route == 'From')
          cell1.textContent = out[routes][i][route];
        else if(route == 'To')
          cell2.textContent = out[routes][i][route];
        else if(route == 'duration')
          cell4.textContent = out[routes][i][route];
        else if(route == 'bus_nos')
          cell3.textContent = out[routes][i][route];
        else if(route == 'distance')
        {
          if(out[routes][i][route].indexOf('km') > -1) 
            distTmp += Number(out[routes][i][route].substring(0, out[routes][i][route].indexOf('km')));
          else
            distTmp += 3.2;
        }
      }
    }
    
    if(distTmp > totalDist)
      totalDist = distTmp;

    row = displaytable.insertRow(rowcount);
    row.style.height = '2px';
    row = row.insertCell(0);
    row.colSpan = '4';
    row.style.backgroundColor = "#DB202C";
    ++rowcount;
  }

  const fml = document.getElementsByClassName('first-mile-stats')[0];
  const lms = document.getElementsByClassName('last-mile-stats')[0];
  const r1 = random()*2 + 0.5;
  p1 = r1;
  const r2 = random()*2 + 0.5;
  p2 = r2;

  fml.innerHTML = `First Mile<br />Distance: ${(r1.toFixed(2))} km<br />Calories: ${(r1 * 100 / 1.6).toFixed(2)}<br />Bounce Bike Rental: ${Math.ceil(r1 * 6)} Rs.`;
  lms.innerHTML = `Last Mile<br />Distance: ${(r2.toFixed(2))} km<br />Calories: ${(r2 * 100 / 1.6).toFixed(2)}<br />Bounce Bike Rental: ${Math.ceil(r2 * 6)} Rs.`;

  calories = (r1 * 100 / 1.6) + (r2 * 100 / 1.6);
  displayTable();
}

const backToRouteSelect = () => {
  displayView = 'Bus Route';
  const busDiv = document.getElementsByClassName('routes-wrapper')[0];
  busDiv.style.animation = 'popdown 0.32s 1';
  setTimeout(() => {
    const busDiv = document.getElementsByClassName('routes-wrapper')[0];
    busDiv.style.display = 'none';
    busDiv.style.animation = '';

    const serviceDiv = document.getElementsByClassName('bus-select-wrapper')[0];
    serviceDiv.style.animation = 'popup 0.32s 1';
    serviceDiv.style.animationDirection = 'reverse';
    serviceDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const serviceDiv = document.getElementsByClassName('bus-select-wrapper')[0];
      serviceDiv.style.animation = '';
      serviceDiv.style.animationDirection = '';
    }, 300);
  }, 290);
};

const getSavings = () => {
  const saveDiv = document.getElementsByClassName('saving-stat')[0];
  const fromDiv = document.getElementsByClassName('bus-selector')[0];
  const toDiv = document.getElementsByClassName('bus-selector')[1];
  seed(fromDiv.selectedIndex * 1000 + toDiv.selectedIndex + 1);
  const busCost = random() * 35 + 15;
  
  saveDiv.innerHTML = `Distance: ${totalDist}<br />Ola Cabs: ${((totalDist * 17 > 50)? totalDist * 17: 50).toFixed(2)} Rs.<br />Ola Share ${((totalDist * 15 > 45)? totalDist * 15: 45).toFixed(2)}Rs. <br />`
    + `Bus Cost: <span style="color: green">${busCost.toFixed(2)} Rs.</span><br /><br /><br />Savings: <span style="color: green">${(((totalDist * 17 > 50)? totalDist * 17: 50) - busCost).toFixed(2)} Rs.</span>`;

  savings = (((totalDist * 17 > 50)? totalDist * 17: 50) - busCost);
  const busDiv = document.getElementsByClassName('routes-wrapper')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('routes-wrapper')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('savings-wrapper')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('savings-wrapper')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
    }, 300);
  }, 300);
}

const backToRoute = () => {
  displayView = 'bus-routes';
  const busDiv = document.getElementsByClassName('savings-wrapper')[0];
  busDiv.style.animation = 'popdown 0.32s 1';
  setTimeout(() => {
    const busDiv = document.getElementsByClassName('savings-wrapper')[0];
    busDiv.style.display = 'none';
    busDiv.style.animation = '';

    const serviceDiv = document.getElementsByClassName('routes-wrapper')[0];
    serviceDiv.style.animation = 'popup 0.32s 1';
    serviceDiv.style.animationDirection = 'reverse';
    serviceDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const serviceDiv = document.getElementsByClassName('routes-wrapper')[0];
      serviceDiv.style.animation = '';
      serviceDiv.style.animationDirection = '';
    }, 300);
  }, 290);
};

const finalSavings = () => {
  const pshycDiv = document.getElementsByClassName('pshyc')[0];
  const pref = localStorage.getItem('usr-preference');
  let ihtmls = null;

  if(pref == 'Netflix Binge')
  {
    ihtmls = (savings >= 300)
      ? `You just saved enough for ${Math.floor(savings/300)} month worth of Netflix subscription<br /><br/>`
      : `You are on your way towards a month of netflix subscription. You are now only short of ${(300 - savings).toFixed(2)} Rs.<br/><br /> By the way`;
    ihtmls += `You can now get a 100Rs cashback with a connection of ACT fibernet. Visit <a href="https://www.actcorp.in/netflix/terms.html">Act Website</a> to know more`;
  }
  else if(pref == 'Frugal')
  {
    ihtmls = `You just saved ${savings.toFixed(2)}<br/><br/>Kotak Mahindra Bank is offering 6% interest on savings back account as comapared to rest of the banks. To know more plaease visit<a href="https://www.kotak.com/811-savingsaccount-ZeroBalanceAccount/811/ahome2.action?Source=GoogleSEM&banner=SearchBrand_desktop&pubild=brand_generic&gclid=CjwKCAjwnf7qBRAtEiwAseBO_HkVoxVmv4pHNQbySZ3Kg675X8k6nDYrYSn54XgQJkhvECEEi9HSGRoCZ6IQAvD_BwE">Kotak Mahindra Bank</a>`;
  }
  else if(pref == 'Foodie')
  {
    const randd = random();
    ihtmls = (savings >= 35)
      ? `You just saved enough for ${Math.floor(savings / 35)} ${(randd> 0.5)? 'Pan Pizza': 'Burgers'}<br />`
      : `That pan pizza is just a couple of bucks away. You just need ${savings.toFixed(2)} Rs. more for that delicious panner pizza<br />`;

    ihtmls += `${(randd > 0.5)? "Domino's" : "Burger King"} is having a limited time offer for user of 3301. Use code isaveplanet to avail a 20% discount upto Rs. 500`;
  }
  else {
    ihtmls = `You just burned ${calories.toFixed(2)} calories. Salute to you who care about health<br /><br />Cult fitness near you is giving a 25% off on a 6 moth membership. Please visit <a href="https://www.cure.fit/lp/10.fit_sale?utm_campaign=975551252&utm_source=google&utm_medium=cpc&utm_content=378839700392&utm_term=cult.fit&adgroupid=47127398383&device=c&gclid=CjwKCAjwnf7qBRAtEiwAseBO_GjMHY-3tOIHwO9BDHcbp9yWO3-r01knE2sT55DoEaoLAPCN2Vzy1xoCJ9YQAvD_BwE">cult.fit</a> to know more`;
  }

  pshycDiv.innerHTML = ihtmls;

  const busDiv = document.getElementsByClassName('savings-wrapper')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('savings-wrapper')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('final-saving-wrapper')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('final-saving-wrapper')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
    }, 300);
  }, 250);
};

const backToSave = () => {
  const busDiv = document.getElementsByClassName('final-saving-wrapper')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('final-saving-wrapper')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('savings-wrapper')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('savings-wrapper')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
    }, 300);
  }, 250);
};

const congoFunc = () => {
  localStorage.setItem('last-routes', JSON.stringify(lastJson));
  const busDiv = document.getElementsByClassName('final-saving-wrapper')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  const sval = localStorage.getItem('total-savings');
  if(sval)
    localStorage.setItem('total-savings', String(Number(sval) + savings));
  else
    localStorage.setItem('total-savings', String(savings));

  const cval = localStorage.getItem('total-calories');
  if(sval)
    localStorage.setItem('total-calories', String(Number(cval) + calories));
  else
    localStorage.setItem('total-calories', String(calories));

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('final-saving-wrapper')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('congo-to')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('congo-to')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
      setTimeout(() => {
        loopover();
      }, 2000);
    }, 300);
  }, 250);
};

const loopover = () => {
  const busDiv = document.getElementsByClassName('congo-to')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('congo-to')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('service-wrapper')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('service-wrapper')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
    }, 300);
  }, 250);
};

const sww = () => {
  const busDiv = document.getElementsByClassName('loading-screen-wrapper')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('loading-screen-wrapper')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('nf')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('nf')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
      setTimeout(() => {
        swwToSel();
      }, 2000);
    }, 300);
  }, 250);
};

const swwToSel = () => {
  const busDiv = document.getElementsByClassName('nf')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('nf')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('service-wrapper')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('service-wrapper')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
    }, 300);
  }, 250);
}

const backToSelections = () => {
  const busDiv = document.getElementsByClassName('parking-wrapper')[0];
  busDiv.style.animation = 'popdown 0.32s 1';
  setTimeout(() => {
    const busDiv = document.getElementsByClassName('parking-wrapper')[0];
    busDiv.style.display = 'none';
    busDiv.style.animation = '';

    const serviceDiv = document.getElementsByClassName('service-wrapper')[0];
    serviceDiv.style.animation = 'popup 0.32s 1';
    serviceDiv.style.animationDirection = 'reverse';
    serviceDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const serviceDiv = document.getElementsByClassName('service-wrapper')[0];
      serviceDiv.style.animation = '';
      serviceDiv.style.animationDirection = '';
    }, 300);
  }, 250);
};

const toParking = () => {
  const arr = ['Orion Mall', 'Reagontol Mall', 'Realton Massot', 'Trolly House', 'Furniture World', 'Cory\'s Place', 'La Marvella', 'PES University', 'Forum Value Mall', 'Forum Mall',
    'Aqua World', 'Film City', 'City Point', 'City CEnter', 'Archade Mall', 'Dmart'];

  const selDiv = document.getElementsByClassName('park-selector')[0];
  const indx = selDiv.selectedIndex;
  seed(indx);

  const Place = selDiv.options[indx].value;
  const pcard = document.getElementsByClassName('parking-pls')[0];
  const rn = Math.floor(random() * arr.length);
  pcard.innerHTML = `${arr[rn]}<br />${Place}<br>Bengaluru`;

  const busDiv = document.getElementsByClassName('parking-wrapper')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('parking-wrapper')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('parking-spot-wrapper')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('parking-spot-wrapper')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
    }, 300);
  }, 250);
}

const backToPS = () => {
  const busDiv = document.getElementsByClassName('parking-spot-wrapper')[0];
  busDiv.style.animation = 'popdown 0.32s 1';
  setTimeout(() => {
    const busDiv = document.getElementsByClassName('parking-spot-wrapper')[0];
    busDiv.style.display = 'none';
    busDiv.style.animation = '';

    const serviceDiv = document.getElementsByClassName('parking-wrapper')[0];
    serviceDiv.style.animation = 'popup 0.32s 1';
    serviceDiv.style.animationDirection = 'reverse';
    serviceDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const serviceDiv = document.getElementsByClassName('parking-wrapper')[0];
      serviceDiv.style.animation = '';
      serviceDiv.style.animationDirection = '';
    }, 300);
  }, 250);
}

const getLastList = () => {

  const ls = localStorage.getItem('last-routes');
  let out;
  if(ls != null)
    out = JSON.parse(ls);
  else
    out = {};
  const displaytable = document.getElementsByClassName('see-later')[0];

  // Remove all child nodes from the table before insertion
  let child = displaytable.lastElementChild;
  while (child) {
    displaytable.removeChild(child);
    child = displaytable.lastElementChild;
  }

  let row = displaytable.insertRow(0);
  let h1 = row.insertCell(0);
  let h2 = row.insertCell(1);
  let h3 = row.insertCell(2);
  let h4 = row.insertCell(3);

  h1.textContent = 'From';
  h2.textContent = 'To';
  h3.textContent = 'Buses';
  h4.textContent = 'Duration';

  let breaker = displaytable.insertRow(1);
  breaker.style.height = '2px';
  breaker = breaker.insertCell(0);
  breaker.colSpan = '4';
  breaker.style.backgroundColor = "#DB202C";

  breaker = displaytable.insertRow(0);
  breaker.style.height = '2px';
  breaker = breaker.insertCell(0);
  breaker.colSpan = '4';
  breaker.style.backgroundColor = "#DB202C";

  let rowcount = 3;
  totalDist = 5;
  for(routes in out)
  {
    let distTmp = 0;
    for(let i = 0; i < out[routes].length; ++i)
    {
      row = displaytable.insertRow(rowcount);
      ++rowcount;

      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      for(route in out[routes][i])
      {
        if(route == 'Hop')
          continue;
        else if(route == 'From')
          cell1.textContent = out[routes][i][route];
        else if(route == 'To')
          cell2.textContent = out[routes][i][route];
        else if(route == 'duration')
          cell4.textContent = out[routes][i][route];
        else if(route == 'bus_nos')
          cell3.textContent = out[routes][i][route];
        else if(route == 'distance')
        {
          if(out[routes][i][route].indexOf('km') > -1) 
            distTmp += Number(out[routes][i][route].substring(0, out[routes][i][route].indexOf('km')));
          else
            distTmp += 3.2;
        }
      }
    }
    
    if(distTmp > totalDist)
      totalDist = distTmp;

    row = displaytable.insertRow(rowcount);
    row.style.height = '2px';
    row = row.insertCell(0);
    row.colSpan = '4';
    row.style.backgroundColor = "#DB202C";
    ++rowcount;
  }

  const busDiv = document.getElementsByClassName('service-wrapper')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('service-wrapper')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('list-wrapper')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('list-wrapper')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
    }, 300);
  }, 250);
}

const backToSW = () => {
  const busDiv = document.getElementsByClassName('list-wrapper')[0];
  busDiv.style.animation = 'popdown 0.32s 1';
  setTimeout(() => {
    const busDiv = document.getElementsByClassName('list-wrapper')[0];
    busDiv.style.display = 'none';
    busDiv.style.animation = '';

    const serviceDiv = document.getElementsByClassName('service-wrapper')[0];
    serviceDiv.style.animation = 'popup 0.32s 1';
    serviceDiv.style.animationDirection = 'reverse';
    serviceDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const serviceDiv = document.getElementsByClassName('service-wrapper')[0];
      serviceDiv.style.animation = '';
      serviceDiv.style.animationDirection = '';
    }, 300);
  }, 250);
}

const getStats = () => {
  const statBox = document.getElementsByClassName('stat-card')[0];
  let sval = localStorage.getItem('total-savings'), cval = localStorage.getItem('total-calories');

  if(sval == null)
    sval = 0;

  if(cval == null)
    cval = 0;

  statBox.innerHTML = `<h3>Statistics</h3><br /><br /><br />Maximum Possible Savings<br />${Number(sval).toFixed(2)} Rs.<br /><br />Maximum Possible Health Benifits<br />${Number(cval).toFixed(2)} calories burnt`;


  const busDiv = document.getElementsByClassName('service-wrapper')[0];
  busDiv.style.animation = 'popup 0.32s 1';

  setTimeout(() => {
    const busDiv = document.getElementsByClassName('service-wrapper')[0];
    busDiv.style.animation = '';
    busDiv.style.animationDirection = '';
    busDiv.style.display = 'none';

    const loadDiv = document.getElementsByClassName('stats-wrapper')[0];
    loadDiv.style.animation = 'popdown 0.32s 1';
    loadDiv.style.animationDirection = 'reverse';
    loadDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const loadDiv = document.getElementsByClassName('stats-wrapper')[0];
      loadDiv.style.animation = '';
      loadDiv.style.animationDirection = '';
    }, 300);
  }, 250);
};

const selectionChange = () => {
  const selDiv = document.getElementsByClassName('choice-sel')[0];
  const ch = selDiv.options[selDiv.selectedIndex].value;
  localStorage.setItem('usr-preference', ch);

  const sectionDiv = document.getElementById('usertype');
  sectionDiv.style.display = 'none'; 
}

const back2sel = () => {
  const busDiv = document.getElementsByClassName('stats-wrapper')[0];
  busDiv.style.animation = 'popdown 0.32s 1';
  setTimeout(() => {
    const busDiv = document.getElementsByClassName('stats-wrapper')[0];
    busDiv.style.display = 'none';
    busDiv.style.animation = '';

    const serviceDiv = document.getElementsByClassName('service-wrapper')[0];
    serviceDiv.style.animation = 'popup 0.32s 1';
    serviceDiv.style.animationDirection = 'reverse';
    serviceDiv.style.display = 'block';
    window.scrollTo(0, 0);
    setTimeout(() => {
      const serviceDiv = document.getElementsByClassName('service-wrapper')[0];
      serviceDiv.style.animation = '';
      serviceDiv.style.animationDirection = '';
    }, 300);
  }, 250);
};
