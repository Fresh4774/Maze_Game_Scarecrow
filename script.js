setTimeout(function(){
  const maze = [0,10,0,0,0,0,0,0,0,0,
                0,1,0,1,1,1,1,1,1,0,
                0,1,1,1,0,0,0,0,1,0,
                0,1,0,1,0,0,0,0,12,0,
                0,1,0,1,0,0,0,0,0,0,
                0,1,0,1,1,1,1,1,1,11,
                0,1,0,1,0,0,0,0,0,0,
                0,1,0,1,0,0,0,0,0,0,
                0,12,0,1,1,1,1,1,12,0,
                0,0,0,0,0,0,0,0,0,0],
        cm = document.querySelector('#corn_maze'),
        cm_loc = cm.getBoundingClientRect(),
        pl = document.querySelector('#child_of_the_corn'),      
        tile_size = 100,
        offset_x = cm_loc.x,
        offset_y = cm_loc.y

  var cam = document.querySelector('#corn_camera'),
      cam_loc = cam.getBoundingClientRect()
  cm.setAttribute('top', (cam_loc.width*.5) - 50)  
  cm.setAttribute('left', (cam_loc.width*.5) - 150)
  cm.style.left = cm.getAttribute('left') + 'px'
  cm.style.top = cm.getAttribute('top') + 'px'


  function addBlocks(){
    for(var i=0;i<maze.length;i++){
      var b = document.createElement('div')
      b.className = 'maze_block'
      if(maze[i] === 0) {
        b.className = 'maze_block corn'
      }
      if(maze[i] === 1) {
        b.className = 'maze_block path'
      }
      if(maze[i] === 10) {
        b.className = 'maze_block path path_startpoint'
      }
      if(maze[i] === 11) {
        b.className = 'maze_block path path_endpoint'
      }
      if(maze[i] === 12) {
        b.className = 'maze_block path path_dead'
      }
      b.style.animationDelay = Math.random()*2 + 's'
      b.onanimationend = function() {
        this.classList.add('sway')
      }
      cm.appendChild(b)
    }
  }

  addBlocks()

  var direction = 0
  window.addEventListener('mouseup', function(evt) {
    evt = evt || window.event;  
    direction = 0
    if(evt.target.classList.contains('button_left')) {
      direction = 37
    }
    if(evt.target.classList.contains('button_top')) {
      direction = 38
    }
    if(evt.target.classList.contains('button_right')) {
      direction = 39
    }
    if(evt.target.classList.contains('button_bottom')) {
      direction = 40
    }
    // console.log(direction)
  })

  function movePlayer(e) {
    // hide buttons
    document.querySelector('#btn_box').style.pointerEvents = 'none'
    window.removeEventListener('keydown', movePlayer)
    setTimeout(function(){
      window.addEventListener('keydown', movePlayer)
      document.querySelector('#btn_box').style.pointerEvents = ''
    }, 250)

    var pl_loc = pl.getBoundingClientRect(),
        pl_x = pl_loc.x + (pl_loc.width*.5),
        pl_y = pl_loc.y + (pl_loc.height*.5),
        cm_loc = cm.getBoundingClientRect()

    if(e.keyCode == 37 || direction == 37) {
      var new_loc = document.elementFromPoint(pl_x - tile_size, pl_y)
      if(new_loc.classList.contains('path')) {
        cm.setAttribute('left', Number(cm.getAttribute('left')) + tile_size)        
        cm.style.left = cm.getAttribute('left') + 'px'
      }
    }
    if(e.keyCode == 38 || direction == 38) {
      var new_loc = document.elementFromPoint(pl_x, pl_y - tile_size)
      if(new_loc.classList.contains('path')) {
        cm.setAttribute('top', Number(cm.getAttribute('top')) + tile_size)
        cm.style.top = cm.getAttribute('top') + 'px'
      }
    }
    if(e.keyCode == 39 || direction == 39) {
      var new_loc = document.elementFromPoint(pl_x + tile_size, pl_y)
      if(new_loc.classList.contains('path')) {
        cm.setAttribute('left', Number(cm.getAttribute('left')) - tile_size)
        cm.style.left = cm.getAttribute('left') + 'px'
      }
      if(new_loc.classList.contains('path_endpoint')) {
        setTimeout(function(){
          alert('GG YOU SURVIVED!')            
        }, 500)
      }    
    }
    if(e.keyCode == 40 || direction == 40) {
      var new_loc = document.elementFromPoint(pl_x, pl_y + tile_size)
      if(new_loc.classList.contains('path')) {
        cm.setAttribute('top', Number(cm.getAttribute('top')) - tile_size)
        cm.style.top = cm.getAttribute('top') + 'px'
      }
    }
    // console.log(new_loc)
  }

  setTimeout(function(){    
    window.addEventListener('keydown', movePlayer)  
    window.addEventListener('mouseup', movePlayer)  
  }, 4000)  
}, 100)