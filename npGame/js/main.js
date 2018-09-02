(function () {
	"use strict";
	var myUI, userData, currentNeed;
	
	userData = {
		antColor: "rgb(0,0,0)",
		antLevel: 0,
		antSpeed: 5,
		antExp: 0
	};
	currentNeed = ["\u{1F352}", "\u{1F34E}", "\u{1F969}", "\u{1F344}", "\u{1F36C}", "\u{1F36B}", "\u{1F355}", "\u{1F340}"];
/* Begin myUI */	
	myUI = {
/* return functions */
        bySel: (x) => { return document.querySelector(x); },//return one element via class or id
		bySelAll: (x) => { return document.querySelectorAll(x); },//return a group of elements via class
		byTag: (x, y) => { return document.getElementsByTagName(x)[y]; },//calling elements by tag name accepts two params, the first is x for the element name, the second is y for the index 
		createEle: (x) => { return document.createElement(x);},//create any HTML element
		removeThisFullNode: (x) => { var y, z; return y = x.className, z = y.split("_full"), setTimeout(() => { x.className =  z[0]; setTimeout(() => { x.remove() }, 1200); }, 200); },//this dohicky will take in nodes with a className appended with "_full" on the end.  once removed, the new class is set, then removes the node.  *IMPORTANT NOTE* this return function will not work if the node does not have a className that ends with "_full", for a non-"_full" node, use the return function named removeThisNode()
		removeNode: (x) => { return x.remove(); },//use this one to remove any node regardless of className
		pullFullStatus: (x) => { var y, z; return y = x.className, z = y.split("_full"); },//return the element className with "_full" removed.  -will not remove node
		reloadUI: () => { return location.reload(); },//self explanatory
		deleteStorageAndReloadUI: () => { return localStorage.clear(), location.reload(); },//clearing storage and reloading page
		nulify: (x) => { return x.onclick = null; },//will make the element end any events
        saveColor: (x, y, z, ant) => { return () => { var v; return v = window.getComputedStyle( x[y] ,null).getPropertyValue('background-color'), z.antColor = v, localStorage.setItem("userData", JSON.stringify(z)), myUI.updateAntColor(v, x, y, z, ant); } },
		updateAntColor: (v, x, y, z, ant) => { var xId, xIdCut, newId, color; return xId = x[y].id, xIdCut = xId.split("Box"), newId = xIdCut[0].concat("Ant"), ant.id = newId, color = ant.id.split('Ant'), ant.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.png)"; },
		
/* Initializations */
		init: () => {
			//localStorage.clear();
			var uData = localStorage.getItem("userData");
			if (!uData || uData === null) {
				localStorage.setItem("userData", JSON.stringify(userData));
			}
			
			var gBool = localStorage.getItem("gameBool");
			if (!gBool || gBool === null) {
				localStorage.setItem("gameBool", false);
			}
			//alert("initiation complete");
			
			//
			//myUI.resizer();
			//
			setTimeout(() => {
				myUI.loadAudioRange();
				myUI.loadFrameStarter();
			}, 50)
			window.onresize = (() => { return myUI.resizer(); });
			//localStorage.clear();
		},
		resizer: () => {
			var userPrefHolder = myUI.bySel(".userPrefHolder_full"),
			    ant;
			
			if (userPrefHolder) { 
			ant = myUI.bySel(".ants");
			
			var aL = ant.style.left.split("px"),
			    aB = ant.style.bottom.split("px"),
			    upW = userPrefHolder.clientWidth,
				upH = userPrefHolder.clientHeight,
				aBr = +upH + +aB[0];
				
			if (aBr < 0) {
                //down rezize adjuster

                //console.log(ant.style.bottom);
			    ant.style.bottom = -upH + "px";
			}
			if (aL[0] > upW) {
				//right resize adjuster
				ant.style.left = (upW - 81) + "px";
			}
			
			} else { 
			
			    return false;
			
			}
		},
		loadFrameStarter: () => {
			var uFrame = myUI.createEle("div");
			
			uFrame.innerHTML = "";
			uFrame.className = "uFrame";
			
			dvContain.appendChild(uFrame);
			
			setTimeout(() => {
				uFrame.className = "uFrame_full";
				setTimeout(() => {
					myUI.loadFrameStuffs(uFrame);
				}, 50);
			}, 50);
		},
		loadFrameStuffs: (uFrame) => {
				var startBtn = myUI.createEle("button"),
				    contBtn = myUI.createEle("button"),
					startOverBtn = myUI.createEle("button"),
					gBool = localStorage.getItem("gameBool");;
				
				startOverBtn.innerHTML = "Start Over";
				startOverBtn.className = "startOverBtn";
				startOverBtn.onclick = myUI.newProgramPrompt(uFrame, contBtn, startOverBtn);
				
				contBtn.innerHTML = "Continue";
				contBtn.className = "contBtn";
				contBtn.onclick = myUI.contProgram(uFrame, contBtn, startOverBtn);
				
				startBtn.innerHTML = "Start";
				startBtn.className = "startBtn";
				startBtn.onclick = myUI.firstStartProgram(uFrame, startBtn);
				
				if (gBool === "false") {
				    uFrame.appendChild(startBtn);
					setTimeout(() => {
					startBtn.className = "startBtn_full";
				}, 100);
				} else {
					uFrame.appendChild(contBtn);
					
					uFrame.appendChild(startOverBtn);
					
					setTimeout(() => {
					contBtn.className = "contBtn_full";
					startOverBtn.className = "startOverBtn_full";
				}, 100);
				}
				
		},
/* Program Stuffs */
		newProgramPrompt: (uFrame, contBtn, startOverBtn) => {
			return () => {
				myUI.nulify(startOverBtn);
				myUI.removeThisFullNode(contBtn);
			    myUI.removeThisFullNode(startOverBtn);
				myUI.launchNewGamePrompt(uFrame);
				//alert("startOverBtn");
			}
		},
		launchNewGamePrompt: (uFrame) => {
			var qHolder = myUI.createEle("div"),
			    question = myUI.createEle("div"),
				yesBtn = myUI.createEle("button"),
				noBtn = myUI.createEle("button");
			
			noBtn.innerHTML = "no";
			noBtn.className = "noBtn";
			noBtn.onclick = myUI.noFunc();
			
			yesBtn.innerHTML = "yes";
			yesBtn.className = "yesBtn";
			yesBtn.onclick = myUI.yesFunc();
			
			question.innerHTML = "ARE YOU SURE YOU WOULD LIKE TO START OVER?";
			
			qHolder.className = "qHolder";
			qHolder.appendChild(question);
			qHolder.appendChild(yesBtn);
			qHolder.appendChild(noBtn);
			uFrame.appendChild(qHolder);
			
			setTimeout(() => {
					qHolder.className = "qHolder_full";
				}, 600);
		},
		
		beginUserPref: (uFrame) => {
			var key = {
				87: false,
				68: false,
				65: false,
				83: false
				
			};
			var uData = localStorage.getItem("userData");
			var uuu = JSON.parse(uData);
			
			var userPrefHolder = myUI.createEle("div"),
			    colorHolder = myUI.createEle("div"),
				blueBox = myUI.createEle("div"),
				redBox = myUI.createEle("div"),
				pinkBox = myUI.createEle("div"),
				orangeBox = myUI.createEle("div"),
				greenBox = myUI.createEle("div"),
				yellowBox = myUI.createEle("div"),
				purpleBox = myUI.createEle("div"),
				blackBox = myUI.createEle("div");
			
			var antHolder = myUI.createEle("div"),
			    ant = myUI.createEle("div");
			
			ant.innerHTML = "&nbsp;";
			ant.className = "ants";
			ant.id = "nullAnt";
            ant.onmouseover = myUI.thinker(ant, uuu);
            ant.style.left = "10px";
			ant.style.bottom = "-610px";
			
			antHolder.appendChild(ant);
			antHolder.className = "antHolder";
			
			blackBox.className = "colorBoxes";
			blackBox.id = "blackBox";
			
			purpleBox.className = "colorBoxes";
			purpleBox.id = "purpleBox";

			yellowBox.className = "colorBoxes";
			yellowBox.id = "yellowBox";
			
			greenBox.className = "colorBoxes";
			greenBox.id = "greenBox";
			
			orangeBox.className = "colorBoxes";
			orangeBox.id = "orangeBox";
			
			pinkBox.className = "colorBoxes";
			pinkBox.id = "pinkBox";

			redBox.className = "colorBoxes";
			redBox.id = "redBox";
			
			blueBox.className = "colorBoxes";
			blueBox.id = "blueBox";

			colorHolder.className = "colorHolder";
			colorHolder.appendChild(blueBox);
			colorHolder.appendChild(redBox);
			colorHolder.appendChild(pinkBox);
			colorHolder.appendChild(orangeBox);
			colorHolder.appendChild(greenBox);
			colorHolder.appendChild(yellowBox);
			colorHolder.appendChild(purpleBox);
			colorHolder.appendChild(blackBox);
			
			userPrefHolder.innerHTML = "<span id='spnArrow' class='menu_open'>ðŸ”º</span><br />";
			userPrefHolder.className = "userPrefHolder";
			
			userPrefHolder.appendChild(colorHolder);
			userPrefHolder.appendChild(antHolder);
			
			uFrame.appendChild(userPrefHolder);
			setTimeout(() => {
				var spnArrow = myUI.bySel("#spnArrow");
				spnArrow.addEventListener("click", myUI.toggleMenu(spnArrow), false);
			}, 40);
			setTimeout(() => { 
                userPrefHolder.className = "userPrefHolder_full";
				
				var colorBoxes = myUI.bySelAll(".colorBoxes");
				
				for(var i = 0; i < colorBoxes.length; i++) {
					colorBoxes[i].addEventListener("click", myUI.saveColor(colorBoxes, i, uuu, ant), false);

				}
				
			}, 1000);
			body.onkeydown = body.onkeyup = (e) => {
                var userPrefHolder = myUI.bySel(".userPrefHolder_full");
                var myAnt = myUI.bySel(".ants");
				var mA = myAnt.style.left.split("px");
                var mB = myAnt.style.bottom.split("px");

				var upH = userPrefHolder.clientHeight;
				var upW = userPrefHolder.clientWidth;
				
				var e = e || event;
                key[e.keyCode] = e.type == 'keydown';
	            
          
				
				var resultD = +upH + +mB[0];
				var resultU = (+upH - +mB[0]) - resultD;
				
				//console.log(resultD);
				
                if (key[87] === true && key[68] === false && key[83] === false && key[65] === false) {
					if (resultU >= 100) {
						
						myUI.moveAntUp(myAnt, uuu);
					} else {
						return false;
					}
				}
				if (key[68] === true && key[87] === false && key[83] === false && key[65] === false) {
				    if (mA[0] <= (upW - 81)) {
					    myUI.moveAntRight(myAnt, uuu);
					} else {
						return false;
					}
					
				}
				if (key[83] === true && key[87] === false && key[68] === false && key[65] === false) {
				    
					if (resultD >= 0) {
						myUI.moveAntDown(myAnt, uuu);
					} else {
						return false;
					}
                    
				}
				if (key[65] === true && key[87] === false && key[68] === false && key[83] === false) {
				    if (mA[0] >= -4) {
					    myUI.moveAntLeft(myAnt, uuu);
					} else {
						return false;
					}
				}
				if (key[87] === true && key[68] === true && key[83] === false && key[65] === false) {
					if (resultU >= 100 && mA[0] <= (upW - 81)) {
					    myUI.moveAntUpRight(myAnt, uuu);
				    } else {
						return false;
					}
				}
				if (key[87] === true && key[68] === false && key[83] === false && key[65] === true) {
					if (resultU >= 100 && mA[0] >= -4) {
					    myUI.moveAntUpLeft(myAnt, uuu);
					} else {
						return false;
					}
				}
				if (key[87] === false && key[68] === true && key[83] === true && key[65] === false) {
					if (resultD >= 0 && mA[0] <= (upW - 81)) {
					    myUI.moveAntDownRight(myAnt, uuu);
					} else {
						return false;
					}
				}
				if (key[87] === false && key[68] === false && key[83] === true && key[65] === true) {
                    if (resultD >= 0 && mA[0] >= -4) {					
					    myUI.moveAntDownLeft(myAnt, uuu);
					} else {
						return false;
					}
				}
				if (key[87] === false && key[68] === false && key[83] === false && key[65] === false) {
					myUI.moveAntNull(myAnt);
				}
			};
			setTimeout(() => {
				counter(ant);
			}, 1000);
			
			function counter() { 
	            setTimeout(() => {
					var mB = ant.style.bottom.split("px");
					var color = ant.id.split('Ant');
					if (mB[0] < -500) {
						ant.style.bottom = (+mB[0] + +uuu.antSpeed) + "px";
						
						
						ant.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.gif)";
						
						counter(ant);
					} else {
						ant.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.png)";
					}
					//console.log(mA[0]);
				}, 25);
			};
			
			//alert("launch user pref");
			//myUI.loadUserData(uFrame);
			//myUI.loadProgressBar(uFrame);
		},
		thinker: (ant, uuu) => {
			return () => {
			    var antHolder = ant.parentNode,
				    aL = ant.style.left.split("px"),
					aLp = +aL[0] - +45,
					aD = ant.style.bottom.split("px"),
				    aDp = +aD[0] + +45,
					thought = myUI.createEle("div");
				var rand = currentNeed[Math.floor(Math.random() * currentNeed.length)];
				
				thought.innerHTML = rand;
				thought.className = "thought";
				thought.style.position = "relative";
				thought.style.left = aLp + "px";
				thought.style.bottom = aDp + "px";
				
				antHolder.appendChild(thought)
				ant.onmouseout = () => { return myUI.removeNode(thought) };
                //console.log(aDp);
			}
		},
		toggleMenu: (spnArrow) => {
			return () => {
				var spnParent = spnArrow.parentNode;
				
				if (spnArrow.className === "menu_open") {
					spnArrow.className = "menu_closed";
					spnArrow.innerHTML = "ðŸ”»";
				    spnParent.childNodes[2].style.marginTop = "-300px";
					
					
				} else {
					spnArrow.className = "menu_open";
					spnArrow.innerHTML = "ðŸ”º";
                    spnParent.childNodes[2].style.marginTop = "0";
				}
			}
			
		},
		moveAntNull: (myAnt) => {
			var color = myAnt.id.split('Ant');
			
			//console.log(myAnt.style.transform);
			
			myAnt.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.png)";
		},
		moveAntDownLeft: (myAnt, uuu) => {
			var mA = myAnt.style.left.split("px");
			var mB = myAnt.style.bottom.split("px");
			
			myAnt.style.left = (+mA[0] - (+uuu.antSpeed / 1.66)) + "px";
			myAnt.style.bottom = (+mB[0] - (+uuu.antSpeed / 1.66)) + "px";
			myAnt.style.transform = 'rotate(-135deg)';
			
			var color = myAnt.id.split('Ant');
			
			myAnt.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.gif)";
		},
		moveAntDownRight: (myAnt, uuu) => {
			var mA = myAnt.style.left.split("px");
			var mB = myAnt.style.bottom.split("px");
			
			myAnt.style.left = (+mA[0] + (+uuu.antSpeed / 1.66)) + "px";
			myAnt.style.bottom = (+mB[0] - (+uuu.antSpeed / 1.66)) + "px";
			myAnt.style.transform = 'rotate(135deg)';
			
			var color = myAnt.id.split('Ant');
			
			myAnt.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.gif)";
		},
		moveAntUpLeft: (myAnt, uuu) => {
			var mA = myAnt.style.left.split("px");
			var mB = myAnt.style.bottom.split("px");
			
			myAnt.style.left = (+mA[0] - (+uuu.antSpeed / 1.66)) + "px";
			myAnt.style.bottom = (+mB[0] + (+uuu.antSpeed / 1.66)) + "px";
			myAnt.style.transform = 'rotate(-45deg)';
			
			var color = myAnt.id.split('Ant');
			
			myAnt.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.gif)";
		},
		moveAntUpRight: (myAnt, uuu) => {
			var mA = myAnt.style.left.split("px");
			var mB = myAnt.style.bottom.split("px");
			
			myAnt.style.left = (+mA[0] + (+uuu.antSpeed / 1.66)) + "px";
			myAnt.style.bottom = (+mB[0] + (+uuu.antSpeed / 1.66)) + "px";
			myAnt.style.transform = 'rotate(45deg)';
			
			var color = myAnt.id.split('Ant');
			
			myAnt.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.gif)";
		},
		moveAntRight: (myAnt, uuu) => {
			//console.log(myAnt);
			var mA = myAnt.style.left.split("px");
	
			myAnt.style.left = (+mA[0] + +uuu.antSpeed) + "px";
			myAnt.style.transform = 'rotate(90deg)';
			var color = myAnt.id.split('Ant');

			myAnt.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.gif)";
		},
		moveAntLeft: (myAnt, uuu) => {
			//console.log(myAnt);
			var mA = myAnt.style.left.split("px");

			myAnt.style.left = (+mA[0] - +uuu.antSpeed) + "px";
			myAnt.style.transform = 'rotate(-90deg)';
			var color = myAnt.id.split('Ant');

			myAnt.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.gif)";
		},
		moveAntUp: (myAnt, uuu) => {
			//console.log(myAnt);
			var mA = myAnt.style.bottom.split("px");

			myAnt.style.bottom = (+mA[0] + +uuu.antSpeed) + "px";
			myAnt.style.transform = 'rotate(0deg)';
			var color = myAnt.id.split('Ant');

			myAnt.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.gif)";
		},
		moveAntDown: (myAnt, uuu) => {
			//console.log(myAnt);
			var mA = myAnt.style.bottom.split("px");

			myAnt.style.bottom = (+mA[0] - +uuu.antSpeed) + "px";
			myAnt.style.transform = 'rotate(180deg)';
			var color = myAnt.id.split('Ant');

			myAnt.style.backgroundImage = "url(css/images/ant/" + color[0] + "Ant.gif)";
		},
		contProgram: (uFrame, contBtn, startOverBtn) => {
			return () => {
				myUI.nulify(contBtn);
			    myUI.removeThisFullNode(contBtn);
			    myUI.removeThisFullNode(startOverBtn);
				myUI.loadUserData(uFrame);
			    myUI.loadProgressBar(uFrame);
			    
			//myUI.launchWholeGame(uFrame);
			//alert("resuming game");
			}
		},
		firstStartProgram: (uFrame, startBtn) => {
			return () => {
				myUI.nulify(startBtn);
				myUI.removeThisFullNode(startBtn);
			    
				var gBool = localStorage.getItem("gameBool");
			    
			    localStorage.setItem("gameBool", true);
			
				myUI.beginUserPref(uFrame);
			}
		},
		loadUserData: (uFrame) => {
				//alert("user data loading");
				myUI.pullUserData(uFrame);
		},
		pullUserData: (uFrame) => {
			setTimeout(() => {
				
				myUI.beginUserPref(uFrame);
				//alert("user data full");
			}, 1000);
			
			
		},
/* Sounds, Loading Bar and Settings */
		loadAudioRange: () => {
			//load audio range display here
		},
		loadProgressBar: (uFrame) => {
			var progressBar = myUI.createEle("div"),
			    meter = myUI.createEle("div");
			
			meter.id = "meter";
			
			progressBar.className = "progressBar";
			progressBar.appendChild(meter);
			
			uFrame.appendChild(progressBar);
			setTimeout(() => {
			    progressBar.className = "progressBar_full";
			}, 100);
			setTimeout(() => {
			    myUI.move(progressBar, meter, uFrame);
			}, 750);
		},
		move: (progressBar, meter, uFrame) => {

                var width = 1;
                var id = setInterval(frame, 10);
				
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
						myUI.removeThisFullNode(progressBar);
						
                    } else {
                        width++; 
                        meter.style.width = width + '%'; 
                    }
                }
			
		},
/* Adminitrative */
		noFunc: () => {
			return () => {
			    myUI.reloadUI();
			}
			
		},
		yesFunc: () => {
			return () => {
			    myUI.deleteStorageAndReloadUI();
			}
			
		},
	};
/* End myUI */
	window.onload = () => {
		myUI.init();
		
	};
})();
