var story = [
 	{ 	
 		position: { x: 0, y: 0, z: 0 },
 		description: "There was ummmm...  castle and Lily was in it.  And she saw a staircase leading down.  She saw a unicorn.  And a princess was riding her.  A grand staircase ascends from both the east and west.",
 		exits: {
 			n: { x: 0, y: 1, z: 0, description: 'A Partially opened door.' },
	 		e: { x: 1, y: 0, z: 0, description: 'A grand staircase.' },
	 		w: { x: -1, y: 0, z: 0, description: 'A grand staircase.' },
	 		s: { x: 0, y: -1, z: 0 }
	 	}
 	}, { 		
 		position: { x: 0, y: 1, z: 0 },
 		description: "This is the princess's bedroom",
 		exits: {
	 		s: { x: 0, y: 0, z: 0 }
	 	}
 	}, { 		
 		position: { x: 0, y: -1, z: 0 },
 		description: "You are in front of the castle",
 		exits: {
	 		e: { x: 1, y: -1, z: 0 }
	 	}
	}, { 		
 		position: { x: 0, y: -1, z: 0 },
 		description: "You are in the stable",
 		exits: {
	 		s: { x: 1, y: 0, z: 0 }
	 	}
 	}, { 		
 		position: { x: 0, y: 1, z: 0 },
 		description: "This is the princess's bedroom",
 		exits: {
	 		s: { x: 0, y: 0, z: 0 }
	 	}
 	}, { 		
 		position: { x: -1, y: 0, z: 0 },
 		description: "You are on the west staircase.",
 		exits: {
 			n: { x: 0, y: 1, z: 1 },
	 		e: { x: 0, y: 0, z: 0 }
	 	}
 	}, { 		
 		position: { x: 1, y: 0, z: 0 },
 		description: "You are on the east staircase.",
 		exits: {
 			n: { x: 0, y: 1, z: 1 },
	 		w: { x: 0, y: 0, z: 0 }
	 	}
 	}, { 		
 		position: { x: 0, y: 1, z: 2 },
 		description: "You are at the top of the staircases, standing in the main hall.",
 		exits: {
	 		s: { x: 1, y: 0, z: 0 }
	 	}
 	} 	
];