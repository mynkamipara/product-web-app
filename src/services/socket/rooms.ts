var Global:any = require('../../global');

let socket = Global.io.sockets;

socket.on('connection', function (socket) {
  console.log('connetion')

  socket.on('jointestroom', () => {
    console.log('-testroom')
    socket.join('testroom');
  });

  /* join & Leave room for scorboead */
  socket.on('joinmatchscoreroom', (data) => {
    if ('superindex' in data) {
      //superover score room
      if (!socket.rooms[`${data['match']}-${data['inning']}-so${data['superindex']}`]) {
        socket.join(`${data['match']}-${data['inning']}-so${data['superindex']}`);
      }
    } else {
      if (!socket.rooms[`${data['match']}-${data['inning']}`]) {
        socket.join(`${data['match']}-${data['inning']}`);
      }
    }
  });

  socket.on('leavematchscoreroom', function (data) {
    if ('superindex' in data) {
      socket.leave(`${data['match']}-${data['inning']}-so${data['superindex']}`);
    } else {
      socket.leave(`${data['match']}-${data['inning']}`);
    }

  })

  /* End join & Leavefor scorboead */

  /* join & Leave room for Whole Match */
  socket.on('joinmatch', (data) => {
    if (!socket.rooms[`match_${data['match']}`]) {
      socket.join(`match_${data['match']}`);
      // console.log('joinmtch room')
    }
  });

  socket.on('leavematch', function (data) {
    socket.leave(`match_${data['match']}`);
  })


  /* End  join & Leave room for Whole Match */


  /* join & Leave room for Commentry section tab */
  socket.on('joinmatchcommentry', (data) => {
    if (!socket.rooms[`cmtry_${data['match']}-${data['inning']}`]) {
      socket.join(`cmtry_${data['match']}-${data['inning']}`);
    }
  });

  socket.on('leavematchcommentry', function (data) {
    socket.leave(`cmtry_${data['match']}-${data['inning']}`);
  })


  /* End join & Leave room for Commentry section tab */


})
