	fetch('art.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (const [key, value] of Object.entries(data)) {
        createCheckbox(key);
        createImg(key, value);
      }
    });
    
window.onscroll = function() {
  var totop = document.getElementById("top");
  if (document.body.scrollTop > 125 || document.documentElement.scrollTop > 125) {
    totop.style.display = "block";
  } else {
    totop.style.display = "none";
  }
};
	
function createImg(key,value) {
  //create bg
  var bg = document.createElement('div');
  bg.style.position = "inline";
  bg.id = key+"bg";
  switch (key) { //customize specific bg
    case "ideas":
		bg.style.border = "3px dotted black";
		document.getElementById(key).checked = true;
		break;
    case "edits":
		bg.style.display = "none";
		document.getElementById(key).checked = false;
		break;
	case "other":
		bg.style.display = "none";
		document.getElementById(key).checked = false;
		break;
	case "animated":
		bg.style.display = "none";
		document.getElementById(key).checked = false;
		break;
    default: //if no case is met, mark as checked
      document.getElementById(key).checked = true;
		break;
    }
  for (i = 0; i < value.length; i++) { //for each link
    bg.style.backgroundColor = "rgba(255, 255, 255, 0."+i+"5)";
    //create image
    var img = document.createElement('img'); 
    img.id = key+i;
    img.alt = key;
	img.src = value[i]+"&name=240x240"; //get lower res thumbnail
	switch (key) { //customize specific image details
    case "ideas":
		img.loading = "auto";
		break;
	case "animated":
		img.remove();
		break;
    default: //if no case is met, lazy load
      img.loading = "lazy";
		break;
    }
	//create anchor
    var a = document.createElement("a");
    a.href = value[i];
	a.target = "_blank";
	a.title = "click to view full resolution";
    a.appendChild(img);
    bg.appendChild(a);
    document.getElementById('art').appendChild(bg);
    
  }
}

function createCheckbox(key) {
  var check = document.createElement('input');
  check.id = key;
  check.type = "checkbox";
  check.title = "show "+key+" tab";
  check.setAttribute("onchange" , "toggle(this)");
  var label = document.createElement('span');
  label.innerText = key+":";
  label.appendChild(check);
  document.getElementById('input').appendChild(label);
  }

function toggle(obj) {
    var e = document.getElementById(obj.id+"bg"); //if all images under key value
    e.style.display = ((e.style.display!='none') ? 'none' : 'inherit');
}