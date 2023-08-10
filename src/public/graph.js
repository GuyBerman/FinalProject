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
async function createGraph() {
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

// Call the createGraph function to generate the graph
createGraph();
