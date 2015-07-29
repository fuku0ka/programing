$(function(){

	function loadImages(){

		var srcList = []; //画像の参照先を格納する配列
		var loadIndex = 0; //読み込み画像インデックス

		//TOPページをフェードイン表示する
		function open(){
			$('body').find('img').css({
				'display': 'block',
				'opacity': 0
			}).animate({'opacity': 1}, 3000);
		};

		//すべての画像の読み込み完了後、ローディングバーをフェードアウト
		function complete(){
			$('.loading').fadeOut(2000, function(){
				$('.loading').remove();
				open();
			});
		};

		//TOPページ内画像の読み込み完了
		function loaded(){
			if( loadIndex != (srcList.length-1) ){
				loadIndex++;
				imgLoad();
			};
			var per = (loadIndex / (srcList.length-1) ) * 100;
			var txt; //パーセンテージのテキストを代入する
			var getParsent = function(){
				txt = parseInt( $('.loading-text').text() );
				if( per > txt ){
					txt++;
					if( txt >= per ) txt = Math.floor(per);
					$('.loading-text').text(txt+'%');
					setTimeout(getParsent, 100);
				};
			};
			setTimeout(getParsent, 100);
			$('.loading-bar').stop().animate({'width': per+'%'}, 300, function(){
				if( per >= 100 ) complete();
			});
		};

		//TOPページ内画像の読み込み
		function imgLoad(){
			var img = new Image();
			$(img).on('load', loaded).attr('src', srcList[loadIndex]);
		};

		//初期設定
		function init(){
			$('body').find('img').each(function(index){
				srcList[index] = $(this).attr('src');
			});
			//body要素の最後ににコード追加
			$('<p>', {
				'class': 'loading',
				'html': '<span class="loading-bar"></span><span class="loading-text">0%</span>'
			}).appendTo('body');
			$('.loading-bar').css('width', '0%');
			imgLoad();
		};

		init();

	};

	loadImages();

});