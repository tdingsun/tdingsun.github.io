

initGrid();





function initGrid() {
  var grid = new Muuri('.grid', {
    dragEnabled: true,
    layoutOnInit: true,
    layout: {
      fillGaps: true
    }
  }).on('move', function () {
    //saveLayout(grid);
  });

  $(".item").each(function(){
  var rand = Math.floor(Math.random() * 200) + 400;
  $(this).css("width", rand);
  console.log("heyall");
})


  $(".filter-btn").click(function() {
    var str = $(this).attr('id').split('-')[1];
    str = ".".concat(str);

    if(str != ".all"){
      filterItems(grid, str);
    }
  });

  $("#filter-all").click(function() {
    filterReset(grid);
  })

  var layout = window.localStorage.getItem('layout');
  if (layout) {
    loadLayout(grid, layout);
  } else {
    grid.layout(true);
  }




}

// function serializeLayout(grid) {
//   var itemIds = grid.getItems().map(function (item) {
//     return item.getElement().getAttribute('data-id');
//   });
//   return JSON.stringify(itemIds);
// }

// function saveLayout(grid) {
//   var layout = serializeLayout(grid);
//   window.localStorage.setItem('layout', layout);
// }

// function loadLayout(grid, serializedLayout) {
//   var layout = JSON.parse(serializedLayout);
//   var currentItems = grid.getItems();
//   var currentItemIds = currentItems.map(function (item) {
//     return item.getElement().getAttribute('data-id')
//   });
//   var newItems = [];
//   var itemId;
//   var itemIndex;

//   for (var i = 0; i < layout.length; i++) {
//     itemId = layout[i];
//     itemIndex = currentItemIds.indexOf(itemId);
//     if (itemIndex > -1) {
//       newItems.push(currentItems[itemIndex])
//     }
//   }

//   grid.sort(newItems, {layout: 'instant'});
// }

function filterItems(grid, str) {
  grid.filter(str);
}

function filterReset(grid) {
  grid.filter('*');
}