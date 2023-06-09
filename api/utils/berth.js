
const berthAllocaton=()=>{
// Define the objective function f(X) that evaluates the quality of a solution X
// X is an array of berth assignments for each vessel
// f(X) returns a positive number that represents the total waiting time of all vessels
// The lower the f(X), the better the solution
function f(X) {
    // Initialize the total waiting time to zero
    let total = 0;
    // Loop through each vessel in X
    for (let i = 0; i < X.length; i++) {
      // Get the berth assigned to vessel i
      let berth = X[i];
      // Get the arrival time and handling time of vessel i
      let arrival = vessels[i].arrival;
      let handling = vessels[i].handling;
      // Calculate the waiting time of vessel i as the difference between the berth availability and the arrival time
      let waiting = Math.max(0, berths[berth].availability - arrival);
      // Update the berth availability as the sum of the arrival time, waiting time and handling time
      berths[berth].availability = arrival + waiting + handling;
      // Update the total waiting time by adding the waiting time of vessel i
      total += waiting;
    }
    // Return the total waiting time
    return total;
  }
  
  // Define the parameters for PSO
  let swarmSize = 50; // The number of particles in the swarm
  let maxIter = 100; // The maximum number of iterations
  let c1 = 2; // The cognitive coefficient
  let c2 = 2; // The social coefficient
  let w = 0.9; // The inertia weight
  
  // Define the problem data
  let numVessels = 10; // The number of vessels to be scheduled
  let numBerths = 5; // The number of berths available
  let vessels = []; // An array of objects that store the arrival, handling and departure times of each vessel
  let berths = []; // An array of objects that store the availability and capacity of each berth
  
  // Generate some random data for testing (you should replace this with your own data)
  for (let i = 0; i < numVessels; i++) {
    vessels.push({
      arrival: Math.floor(Math.random() * 100), // A random number between 0 and 99
      handling: Math.floor(Math.random() * 20) + 1, // A random number between 1 and 20
      departure: Math.floor(Math.random() * 100) + 100 // A random number between 100 and 199
    });
  }
  
  for (let i = 0; i < numBerths; i++) {
    berths.push({
      availability: 0, // Initially zero
      capacity: Math.floor(Math.random() * 10) + 1 // A random number between 1 and 10
    });
  }
  
  // Initialize the swarm with random solutions
  let swarm = []; // An array of objects that store the position, velocity, personal best and fitness of each particle
  for (let i = 0; i < swarmSize; i++) {
  // Create a new particle object
    let particle = {};
    
    // Initialize the position as a random array of berth assignments for each vessel
    particle.position = [];
    
    // Loop through each vessel
    for (let j = 0; j < numVessels; j++) {
      // Assign a random berth to vessel j
      let berth = Math.floor(Math.random() * numBerths);
      // Add the berth to the position array
      particle.position.push(berth);
    }
    
    // Initialize the velocity as a zero array of the same size as the position
    particle.velocity = [];
    for (let j = 0; j < numVessels; j++) {
      particle.velocity.push(0);
    }
    
    // Initialize the personal best as a copy of the position
    particle.pbest = particle.position.slice();
    
    // Evaluate the fitness of the position using the objective function
    particle.fitness = f(particle.position);
    
    // Add the particle to the swarm array
    swarm.push(particle);
  }
  
  // Initialize the global best as the position and fitness of the first particle
  let gbest = {
    position: swarm[0].position.slice(),
    fitness: swarm[0].fitness
  };
  
  // Loop through the remaining particles and update the global best if a better solution is found
  for (let i = 1; i < swarmSize; i++) {
    if (swarm[i].fitness < gbest.fitness) {
      gbest.position = swarm[i].position.slice();
      gbest.fitness = swarm[i].fitness;
    }
  }
  
  // Start the main loop of PSO
  for (let iter = 0; iter < maxIter; iter++) {
    // Loop through each particle in the swarm
    for (let i = 0; i < swarmSize; i++) {
      // Get the current particle object
      let particle = swarm[i];
      
      // Loop through each dimension of the position and velocity
      for (let j = 0; j < numVessels; j++) {
        // Update the velocity using the PSO formula
        let r1 = Math.random(); // A random number between 0 and 1
        let r2 = Math.random(); // A random number between 0 and 1
        let cognitive = c1 * r1 * (particle.pbest[j] - particle.position[j]); // The cognitive component
        let social = c2 * r2 * (gbest.position[j] - particle.position[j]); // The social component
        let newVelocity = w * particle.velocity[j] + cognitive + social; // The new velocity
        
        // Apply some constraints on the velocity to keep it in a reasonable range
        // For example, we can limit the velocity to be between -numBerths and numBerths
        if (newVelocity < -numBerths) {
          newVelocity = -numBerths;
        }
        if (newVelocity > numBerths) {
          newVelocity = numBerths;
        }
        
        // Update the velocity in the particle object
        particle.velocity[j] = newVelocity;
        
        // Update the position using the velocity
        let newPosition = particle.position[j] + newVelocity;
        
        // Apply some constraints on the position to keep it in a feasible space
        // For example, we can round the position to the nearest integer and make sure it is between 0 and numBerths - 1
        newPosition = Math.round(newPosition);
        if (newPosition < 0) {
          newPosition = 0;
        }
        if (newPosition > numBerths - 1) {
          newPosition = numBerths - 1;
        }
        
        // Update the position in the particle object
        particle.position[j] = newPosition;
      }
      
      // Evaluate the fitness of the new position using the objective function
      let newFitness = f(particle.position);
      
      // Update the personal best and fitness if a better solution is found
      if (newFitness < particle.fitness) {
        particle.pbest = particle.position.slice();
        particle.fitness = newFitness;
      }
      
      // Update the global best and fitness if a better solution is found
      if (newFitness < gbest.fitness) {
        gbest.position = particle.position.slice();
        gbest.fitness = newFitness;
      }
      
      // Update the particle in the swarm array
      swarm[i] = particle;
      console.log("Iteration " + iter + ", Particle " + i + ", Fitness " + newFitness); 
      console.log("Position: " + JSON.stringify(particle.position));
      
    }
    
  }
  
  // Print out the best solution found by the algorithm
  console.log("Best solution: " + JSON.stringify(gbest.position));
  console.log("Best fitness: " + gbest.fitness);
}
export default berthAllocaton;
