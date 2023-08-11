// graph.js

// Dimensions
const width = 600;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  // Adjust the width of the SVG container to accommodate rotated labels
const svg = d3.select('#salesGraph')
.append('svg')
.attr('width', width + margin.left + margin.right)
.attr('height', height + margin.top + margin.bottom + 150) // Extra space for x-axis labels
.append('g')
.attr('transform', `translate(${margin.left},${margin.top})`);

// Fetch sales data from API
async function fetchSalesData() {
  try {
    const response = await fetch('/api/getProducts');
    const products = await response.json();
    
    // Create salesData array from products
    const salesData = products.map(product => ({
      product: product.name,
      sales: product.counterSell,
    }));

    return salesData;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return [];
  }
}

// Create graph
async function createGraphA() {
  const salesData = await fetchSalesData();

  // Create scales
  const x = d3.scaleBand()
    .domain(salesData.map(d => d.product))
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(salesData, d => d.sales)])
    .nice()
    .range([height, 0]);
    

  // Create bars
  svg.selectAll('.bar')
    .data(salesData)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.product))
    .attr('y', d => y(d.sales))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.sales));

// Create x-axis
svg.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0,${height})`)
  .call(d3.axisBottom(x))
  .selectAll('text')
  .style('text-anchor', 'end')
  .attr('dx', '-.8em')
  .attr('dy', '.15em')
  .attr('transform', 'rotate(-65)')
  .attr('y', 10); // Adjust the vertical position of the labels

  // Create y-axis
  svg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(y));
}

// Call the createGraphA function to generate the graph
createGraphA();


// graphB.js

// Dimensions and margins
const widthB = 600;
const heightB = 400;
const marginB = { top: 20, right: 20, bottom: 50, left: 60 };

// Create SVG container for Graph B
const svgB = d3.select('#salesGraphB')
  .append('svg')
  .attr('width', widthB + marginB.left + marginB.right)
  .attr('height', heightB + marginB.top + marginB.bottom + 150)
  .append('g')
  .attr('transform', `translate(${marginB.left},${marginB.top})`);

// Fetch sales data by product type for Graph B
async function fetchSalesDataByType() {
  try {
    const response = await fetch('/api/getProducts');
    const products = await response.json();

    // Calculate sales by product type
    const salesByType = {};
    products.forEach(product => {
      const type = product.producttype;
      if (salesByType[type]) {
        salesByType[type] += product.counterSell;
      } else {
        salesByType[type] = product.counterSell;
      }
    });

    // Format data for Graph B
    const data = Object.keys(salesByType).map(type => ({
      type,
      sales: salesByType[type],
    }));

    return data;
  } catch (error) {
    console.error('Error fetching sales data for Graph B:', error);
    return [];
  }
}

// Create Graph B based on product types
async function createGraphB() {
  const data = await fetchSalesDataByType();

  // Create scales for Graph B
  const xB = d3.scaleBand()
    .domain(data.map(d => d.type))
    .range([0, widthB])
    .padding(0.1);

  const yB = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.sales) + 1])
    .nice()
    .range([heightB, 0]);

  // Create bars for Graph B
  svgB.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => xB(d.type))
    .attr('y', d => yB(d.sales))
    .attr('width', xB.bandwidth())
    .attr('height', d => heightB - yB(d.sales));

  // Create x-axis for Graph B
  svgB.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${heightB})`)
    .call(d3.axisBottom(xB))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-65)')
    .attr('y', 10);

  // Create y-axis for Graph B with tick marks every 1.0
  svgB.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yB).ticks(10));
}

// Call the createGraphB function to generate Graph B
createGraphB();


