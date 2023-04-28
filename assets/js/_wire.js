// create wires initally in 4 different color....
var decimPlaces = 0;

var bodyArray=["flag1_mc", "flag2_mc", "flag3_mc", "flag4_mc", "flag5_mc", "flag6_mc", "flag7mc"]
var dragitemvalue=new Array();


function getcssvalue()
{  //console.log($(".sq1").css("left") );
	for(var a=1;a<=7;a++)
	{
		var sqlft = $(".sq"+a).css("left");
		var sqtop = $(".sq"+a).css("top");
		var sqdragsq = $(".sq"+a).attr("drag-sq");	
		var cls = "sq"+a ;
		dragitemvalue[sqdragsq] =  [ {"l":sqlft, "t":sqtop, "clss":cls} ];
		
	}


}

function getparentvalue()
{
	var x = ($(".wrapper_continer").width()-$(".dragarea").width())-15;
	$(".dragarea").css("right",x)
	console.log("dragParentPos", x);
}


resetExperiment()	

/*//////////////////////////*/

	

$(".maxdecimals_cont .btn_minus").on("click", function () {
	noOfDecimals_cmb_Listener("minus");
	// resetquestionswires();
	resetExperiment();
		$('.dragarea .flagdrop').removeAttr('style');
	   $('.dragarea .flagdrop').removeAttr('drop-sq')
	   $("#btn_calculations").removeAttr("disabled");
		$("#btn_reset").removeAttr("disabled");
		$(".flagdrag").removeAttr("dropped-cmp")
});

$(".maxdecimals_cont .btn_plus").on("click", function () {
	noOfDecimals_cmb_Listener("plus");
	resetExperiment();
		$('.dragarea .flagdrop').removeAttr('style');
	   $('.dragarea .flagdrop').removeAttr('drop-sq')
	   $("#btn_calculations").removeAttr("disabled");
		$("#btn_reset").removeAttr("disabled");
		$(".flagdrag").removeAttr("dropped-cmp")
	//resetquestionswires();x
});

function noOfDecimals_cmb_Listener(id) {
	var min = Number($("#maxDecimalsInput_txt").attr('min'));
	var value = Number($("#maxDecimalsInput_txt").val());
	var max = Number($("#maxDecimalsInput_txt").attr('max'));
	if (id === "minus") {
		value = Number($($("#maxDecimalsInput_txt").val(value - 1)).val());
	}
	if (id === "plus") {
		value = Number($($("#maxDecimalsInput_txt").val(value + 1)).val());
	}

	if (value === min) {
		$(".maxdecimals_cont .btn_minus").attr("disabled", "disaled");
	} else {
		$(".maxdecimals_cont .btn_minus").removeAttr("disabled");
	}

	if (value === max) {
		$(".maxdecimals_cont .btn_plus").attr("disabled", "disaled");
	} else {
		$(".maxdecimals_cont .btn_plus").removeAttr("disabled");
	}

	decimPlaces = value;

	resetExperiment();
	
}


////////////End//////////////

function resetExperiment() {
	var mNo;
	for (var i = 1; i <= 7; i++) {
		mNo = -4000 + 1000 * i + parseInt(1000 * Math.random())
		if (decimPlaces == 3) {
			mNo = mNo / 1000
			
		}
		if (decimPlaces == 2) {
			mNo = parseInt(mNo / 10) * 10
			mNo = mNo / 1000
			
		}
		if (decimPlaces == 1) {
			mNo = parseInt(mNo / 100) * 100
			mNo = mNo / 1000
			
		}
		if (i == 4) {
			mNo = 0
			
		}
		//this["flag" + i + "_mc"].boundary = boundary_mc
		

		$("#flag" + (i) + "_mc").find(".legend_txt").html(mNo + " " + (decimPlaces == 0 ? "m" : "km"));
		//$("#flag" + (i) + "_mc").isDraggable = true
	}
		ResetCompounds();
		$(".correctfeed").hide();	
		$(".wrongfeed").hide();
		getcssvalue();

		


	//shuffleArray(bodyArray);	
}

function ResetCompounds () {
	var elements = $(".dragarea>.flagdrop").get()
	var compounds = this.Shuffle(elements);
	$(".dragarea").html(compounds);
	$('.dragarea .flagdrop').removeClass("sq1 sq2 sq3 sq4 sq5 sq6 sq7");
	$('.dragarea .flagdrop').each(function(index){
		$(this).addClass("sq"+(index+1));
	});
	makeDraggable();
	
}
function Shuffle (array) {
	let currentIndex = array.length, randomIndex;
	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}
	return array;
}



$(document).ready(function () {
	//var drag;
	//makeDraggable();
	$('.flagdrag').droppable({
		//accept: '.flagdrop',
		tolerance: "touch",

		drop: function (event, ui) {
			//debugger;
			var dragParentPos = ui.draggable.parent().position();
			var dropPos = $(event.target).position();
			var newposleft = 0;
			var newposTop = 0;
			if (dragParentPos.left < 0) {
				 newposleft = ((dropPos.left - dragParentPos.left) - ui.draggable.width()) - 62;
				 newposTop = (dropPos.top - dragParentPos.top)
			}
			else {
				 newposleft = ((dropPos.left - dragParentPos.left) - ui.draggable.width());
				 newposTop = (dropPos.top - dragParentPos.top)
			}
			ui.draggable.css({ "left": newposleft+6, "top": newposTop+8});

				ui.draggable.attr('drop-sq', $(event.target).attr('drop-sq'));
				var dropcmp = ui.draggable.attr("compound");
				if (!$(event.target).attr("dropped-cmp")) {
				$(".flagdrag[dropped-cmp='" + dropcmp + "']").removeAttr("dropped-cmp")
				event.target.setAttribute("dropped-cmp", dropcmp);
			}
			else { 
					dragsq = ui.draggable.attr('drag-sq');
				 	var posleft = dragitemvalue[dragsq][0].l ;
				  	var posTop = dragitemvalue[dragsq][0].t ;
				  	ui.draggable.animate({ "left": posleft, "top": posTop});
					 

			}
			
		},
		out: function (event, ui) { }	
	});
});


function makeDraggable()
{
	
	$('.flagdrop').draggable({		
		scroll: false,
		zIndex: '5000',
		//revert: 'invalid',
		containment: ".wrapper_continer",
		//appendTo: '.dropzone .flagdrag'	
		revert: function (event, ui) {
			dragsq = $(this).attr('drag-sq');
			var posleft = dragitemvalue[dragsq][0].l ;
			var posTop = dragitemvalue[dragsq][0].t ;
			$(this).data("uiDraggable").originalPosition = {
				top: posTop,
				left: posleft
			};
			
			if (!event) {	
				
				
				var cmpnd = $(this).attr("compound");
				$(".flagdrag.ui-droppable[dropped-cmp='" + cmpnd + "']").removeAttr("dropped-cmp")
			}
			return !event;	
		},
		start: function (event, ui) {
			var cmpnd = $(this).attr("compound");
			$(".flagdrag.ui-droppable[dropped-cmp='" + cmpnd + "']").removeAttr("dropped-cmp")
			
		}
	}).each(function () {
		var top = $(this).position().top;
		var left = $(this).position().left;
		$(this).attr('orgTop', top);
		$(this).attr('orgLeft', left);

	});

}






function clickpassValue() {
	var vallcorrect=true;
	$('.flagdrop').each(function(){
		if($(this).attr('drag-sq')!=$(this).attr('drop-sq'))
		{
			vallcorrect=false;
		}
	});	
	if(vallcorrect)
	{
		$(".correctfeed").show();
		$(".wrongfeed").hide();
		$("#btn_calculations").attr('disabled','disabled');
		$("#btn_reset").attr('disabled','disabled');
		$(".flagdrop").draggable({ disabled: true });

	}else{
		$(".correctfeed").hide();	
		$(".wrongfeed").show();
	}
	
	
}


function resetquestions() {
	   $('.dragarea .flagdrop').removeAttr('style');
	   $('.dragarea .flagdrop').removeAttr('drop-sq')
		$(".correctfeed").hide();
		$(".wrongfeed").hide();
		resetExperiment()
		$("#btn_calculations").removeAttr("disabled");
		$("#btn_reset").removeAttr("disabled");
		$(".flagdrop").draggable({ disabled: false });
		$(".flagdrag").removeAttr("dropped-cmp")
}

function checkanswer()
{
for(a=1; a<=7;a++)
{   var drgid = '#flag'+a+'_mc';
	var dropgrid='#flagHolder'+a+'_mc';
	if($(drgid).attr('drag-sq')==$(drgid).attr('drop-sq')){
		
	}else{

			var dragParentPos = $(drgid).parent().position();	
			var dropPos = $(dropgrid).position();
			var newposleft = 0;
			var newposTop = 0;
			if (dragParentPos.left < 0) {
				 newposleft = ((dropPos.left - dragParentPos.left) - $(drgid).width()) - 62;
				 newposTop = (dropPos.top - dragParentPos.top)
			}
			else {
				 newposleft = ((dropPos.left - dragParentPos.left) - $(drgid).width());
				 newposTop = (dropPos.top - dragParentPos.top)
			}
			$(drgid).animate({ "left": newposleft+6, "top": newposTop+8});

	}
	$(".flagdrop").draggable({ disabled: true });
}
$("#btn_calculations").attr('disabled','disabled');
$("#btn_reset").attr('disabled','disabled');
$(".wrongfeed").hide();

}

$(".more").click(function () {
	//$('.currentContent .currentContentDesc').html($('.popuptext p').html())  
	var content = $(".mobilecurrentContent .currentContentDesc").html();
	 $(".popuptext span").html(content);
	
	$(".popuptext").css("display","block");
	$(".blocker1").css("display","block");
	$(".closebtn").css("display","block")
	
	
 });
 
 $(".closebtn").click(function () {
	//$('.currentContent .currentContentDesc').html($('.popuptext p').html())  
	$(".popuptext").css("display","none");
	$(".blocker1").css("display","none");
	$(".closebtn").css("display"," none")
	
 });

 document.addEventListener('fullscreenchange', fullscreenchanged);

 function fullscreenchanged(event){
	// document.fullscreenElement will point to the element that
	// is in fullscreen mode if there is one. If there isn't one,
	// the value of the property is null.
	if (document.fullscreenElement) {
	  console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
	} else {
	  console.log('Leaving fullscreen mode.');
	  setTimeout(function () {
		getparentvalue();
	  }, 500);
	 
	}
  }
  






	