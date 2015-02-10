var story = {
	rooms: 
	[
		{
			id: '6,14,0',
			remoteDesc: 'the stables',
			desc: 'You are standing in the royal stables.',
			exits: {
				nw: {}
			}
		},
		{
			id: '5,13,0',
			remoteDesc: 'the outside edge of the drawbridge',
			desc: 'You are standing in front of the drawbridge.',
			exits: {
				se: {},
				n: {}
			}
		},
		{
			id: '5,12,0',
			remoteDesc: 'the south end of the drawbridge',
			desc: 'You are standing on the south end of the drawbridge.  Across the drawbridge is an castle.',
			exits: {
				s: {},
				n: {}
			}
		},
		{
			id: '5,11,0',
			remoteDesc: 'the north end of the drawbridge',
			desc: 'You are standing on the south end of the drawbridge.',
			exits: {
				n: {},
				s: {}
			}
		},
		{
			id: '5,10,0',
			remoteDesc: '',
			desc: 'You are in front of the castle gate.  The portcullis is open.',
			exits: {
				s: {},
				n:{}
			}
		},
		{
			id: '5,9,0',
			remoteDesc: 'the portcullis landing area.',
			desc: 'underneath the portcullis',
			exits: {
				n: {},
				s: {},
				w: {},
				e: {}
			}
		},
		{
			id: '4,9,0',
			remoteDesc: 'the west guard station.',
			desc: 'You are in the guard station',
			exits: {
				e: {}
			}
		},
		{
			id: '6,9,0',
			remoteDesc: 'the east guard station.',
			desc: 'You are in the east guard station',
			exits: {
				w: {}
			}
		},
		{
			id: '5,9,0',
			remoteDesc: 'the portcullis landing area.',
			desc: 'Underneath the portcullis.',
			exits: {
				n: {},
				s: {}
			}
		},
		{
			id: '5,8,0',
			remoteDesc: 'the catle foyer.',
			desc: 'You are in the castle foyer.',
			exits: {
				n: {},
				s: {}
			}
		},
		{
			id: '5,7,0',
			remoteDesc: 'the castle\'s main hall.',
			desc: '',
			exits: {
				n: {},
				s: {},
				e: {},
				w: {},
				nw: {},
				ne: {}
			}
		},		
		{
			id: '4,7,0',
			remoteDesc: 'the entrance to the southwest tower.',
			desc: '',
			exits: {
				e: {},
				sw: {}
			}
		},		
		{
			id: '3,8,1',
			remoteDesc: 'the center southwest tower.',
			desc: 'the center of the southwest tower.',
			exits: {
				s: {},
				ne: {}
			}
		},		
		{
			id: '3,9,2',
			remoteDesc: 'the south battlement of the southwest tower.',
			desc: 'You are at the top of the southwest tower, looking at the south battlement.',
			exits: {
				n: {},
				ne: {},
				nw: {}			
			}
		},
		{
			id: '4,8,2',
			remoteDesc: 'the east battlement of the southwest tower.',
			desc: 'You are at the top of the southwest tower, looking at the east battlement.',
			exits: {
				sw: {},
				nw: {}				
			}
		},
		{
			id: '2,8,2',
			remoteDesc: 'the west battlement of the southwest tower.',
			desc: 'You are at the top of the southwest tower, looking at the west battlement.',
			exits: {
				ne: {},
				se: {}				
			}
		},
		{
			id: '3,7,2',
			remoteDesc: 'the north battlement of the southwest tower.',
			desc: 'You are at the top of the southwest tower, looking at the north battlement.',
			exits: {
				sw: {},
				se: {}				
			}
		},		
		{
			id: '6,7,0',
			remoteDesc: 'the entrance to the southeast tower.',
			desc: '',
			exits: {
				w: {},
				se: {}
			}
		},		
		{
			id: '7,8,1',
			remoteDesc: 'the center of the southeast tower.',
			desc: '',
			exits: {
				nw: {},
				s: {}
			}
		},		
		{
			id: '7,9,2',
			remoteDesc: 'the south battlement of the southeast tower.',
			desc: 'You are at the top of the southeast tower, looking at the south battlement.',
			exits: {
				n: {},
				ne: {},
				nw: {}
			}
		},
		{
			id: '8,8,2',
			remoteDesc: 'the east battlement of the southeast tower.',
			desc: 'You are at the top of the southeast tower, looking at the east battlement.',
			exits: {
				sw: {},
				nw: {}				
			}
		},
		{
			id: '6,8,2',
			remoteDesc: 'the west battlement of the southeast tower.',
			desc: 'You are at the top of the southeast tower, looking at the west battlement.',
			exits: {
				ne: {},
				se: {}				
			}
		},
		{
			id: '7,7,2',
			remoteDesc: 'the north battlement of the southeast tower.',
			desc: 'You are at the top of the southeast tower, looking at the north battlement.',
			exits: {
				sw: {},
				se: {}				
			}
		},
		{
			id: '5,6,0',
			remoteDesc: 'the dining room.',
			desc: 'You are in the castle\'s dining room.',
			exits: {
				s: {}				
			}
		},
		{
			id: '4,6,1',
			remoteDesc: 'the northwest staircase.',
			desc: 'You are on the northwest staircase.',
			exits: {
				ne: {},
				se: {}				
			}
		},
		{
			id: '6,6,1',
			remoteDesc: 'the northeast staircase.',
			desc: 'You are on the northeast staircase.',
			exits: {
				nw: {},
				sw: {}				
			}
		},		
		{
			id: '5,5,2',
			remoteDesc: 'the top of the staircase.',
			desc: 'You are at the top of the staircase in the main residence hall.',
			exits: {
				sw: {},
				se: {},
				e: {},
				w: {},
				n: {}
			}
		},
		{
			id: '5,4,2',
			remoteDesc: 'some room.',
			desc: '',
			exits: {
				s: {}
			}
		},
		{
			id: '4,5,2',
			remoteDesc: 'west of the top of the staircase.',
			desc: 'You are one square west of the top of the staircase in the main residence hall.',
			exits: {
				e: {},
				w: {},
				n: {}
			}
		},
		{
			id: '6,5,2',
			remoteDesc: 'the top of the staircase.',
			desc: 'You are one square east of the top of the staircase in the main residence hall.',
			exits: {
				n: {},
				e: {},
				w: {}
			}
			
		},
		{
			id: '3,5,2',
			remoteDesc: '3,5,2.',
			desc: 'You are at 3,5,2.',
			exits: {
				n: {},
				e: {},
				w: {},
				s: {}
			 }
		},
		{
			id: '2,5,2',
			remoteDesc: '2,5,2.',
			desc: 'You are at 2,5,2.',
			exits: {
				e: {},
				w: {}
			 }
		},
		{
			id: '1,5,2',
			remoteDesc: 'the entrance to the west tower.',
			desc: 'You are at the entrance to the west tower',
			exits: {
				n: {},
				s: {},
				e: {}
			 }
		},
		{
			id: '1,4,3',
			remoteDesc: 'the north end of the west tower.',
			desc: '',
			exits: {
				s: {},
				sw: {}
			 }
		},
		{
			id: '0,5,4',
			remoteDesc: 'the west end of the west tower.',
			desc: '',
			exits: {
				ne: {},
				se: {}
			 }
		},
		{
			id: '1,6,3',
			remoteDesc: 'the south end of the west tower.',
			desc: '',
			exits: {
				n: {},
				nw: {}
			 }
		},
		{
			id: '3,6,2',
			remoteDesc: 'the visiting royalty room.',
			desc: '',
			exits: {
				n: {}
			 }
		},
		{
			id: '3,4,2',
			remoteDesc: 'the northwest hall.',
			desc: '',
			exits: {
				s: {},
				n: {}
			 }
		},
		{
			id: '3,3,2',
			remoteDesc: 'the entrance to the northwest tower.',
			desc: '',
			exits: {
				s: {},
				nw: {}
			 }
		},
		{
			id: '2,2,2',
			remoteDesc: 'the west arrowslit and staircase up the west end of the northwest tower.',
			desc: '',
			exits: {
				ne: {},
				se: {}
			 }
		},
		{
			id: '3,1,3',
			remoteDesc: 'the north arrowslit and staircase up the west end of the northwest tower.',
			desc: '',
			exits: {
				se: {},
				sw: {}
			 }
		},
		{
			id: '4,2,4',
			remoteDesc: 'the east arrowslit and staircase up the east end of the northwest tower.',
			desc: '',
			exits: {
				w: {},
				nw: {}
			 }
		},
		{
			id: '3,2,4',
			remoteDesc: 'the pinnacle of the northwest tower.',
			desc: '',
			exits: {
				e: {}
			 }
		},
		{
			id: '4,4,2',
			remoteDesc: 'the west rear hallway.',
			desc: '',
			exits: {
				s: {},
				n: {}
			 }
		},
		{
			id: '4,3,2',
			remoteDesc: 'the northwest section of the rear hallway.',
			desc: '',
			exits: {
				s: {},
				e: {}
			 }
		},
		{
			id: '5,3,2',
			remoteDesc: 'the west center of the rear hallway.',
			desc: '',
			exits: {
				e: {},
				w: {},
				n: {}
			 }
		},
		{
			id: '5,2,2',
			remoteDesc: 'a heavy wooden door.',
			desc: '',
			exits: {
				s: {}
			 }
		},
		{
			id: '6,3,2',
			remoteDesc: 'the northeast section of the rear hallway.',
			desc: '',
			exits: {
				s: {},
				w: {}
			 }
		},
		{
			id: '6,4,2',
			remoteDesc: 'the east rear hallway.',
			desc: '',
			exits: {
				n: {},
				s: {}
			 }
		},
		{
			id: '6,5,2',
			remoteDesc: '6,5,2.',
			desc: '',
			exits: {
				n: {},
				e: {},
				w: {}
			 }
		},
		{
			id: '7,5,2',
			remoteDesc: '7,5,2.',
			desc: '',
			exits: {
				s: {},
				e: {},
				n: {},
				w: {}
			 }
		},
		{
			id: '7,6,2',
			remoteDesc: '7,6,2',
			desc: '',
			exits: {
				n: {}
			 }
		},
		{
			id: '7,4,2',
			remoteDesc: '7,4,2.',
			desc: '',
			exits: {
				s: {},
				n: {}
			 }
		},
		{
			id: '7,3,2',
			remoteDesc: 'the entrance to the northeast tower.',
			desc: '',
			exits: {
				s: {},
				ne: {}
			 }
		},
		{
			id: '8,2,2',
			remoteDesc: 'the east arrowslit and staircase up the east end of the northeast tower.',
			desc: '',
			exits: {
				nw: {},
				sw: {}
			 }
		},
		{
			id: '7,1,3',
			remoteDesc: 'the north arrowslit and staircase up the north end of the northeast tower.',
			desc: '',
			exits: {
				se: {},
				sw: {}
			 }
		},
		{
			id: '6,2,4',
			remoteDesc: 'the west arrowslit and staircase up the west end of the northeast tower.',
			desc: '',
			exits: {
				e: {},
				ne: {}
			 }
		},
		{
			id: '7,2,4',
			remoteDesc: 'the pinnacle of the northeast tower.',
			desc: '',
			exits: {
				w: {}
			 }
		},
		{
			id: '8,5,2',
			remoteDesc: '8,5,2.',
			desc: 'You are at 8,5,2.',
			exits: {
				e: {},
				w: {}
			 }
		},
		{
			id: '1,5,2',
			remoteDesc: 'the entrance to the west tower.',
			desc: 'You are at the entrance to the west tower',
			exits: {
				n: {},
				s: {}
			 }
		},
		{
			id: '9,5,2',
			remoteDesc: 'the entrance to the east tower.',
			desc: 'You are at the entrance to the east tower',
			exits: {
				n: {},
				s: {},
				w: {}
			 }
		},
		{
			id: '9,4,3',
			remoteDesc: 'the north end of the east tower.',
			desc: '',
			exits: {
				s: {},
				se: {}
			 }
		},
		{
			id: '10,5,4',
			remoteDesc: 'the east end of the west tower.',
			desc: '',
			exits: {
				nw: {},
				sw: {}
			 }
		},
		{
			id: '9,6,3',
			remoteDesc: 'the south end of the west tower.',
			desc: '',
			exits: {
				ne: {},
				n: {}
			 }
		}
	]
};