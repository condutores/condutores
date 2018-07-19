angular.module("condutores", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ionicLazyLoad","ngMap","condutores.controllers", "condutores.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Condutores das Americas" ;
		$rootScope.appLogo = "data/images/IconeApp-192x192.png" ;
		$rootScope.appVersion = "5.63.9" ;
		$rootScope.headerShrink = false ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "condutores",
				storeName : "condutores",
				description : "The offline datastore for Condutores app"
			});



		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("condutores.dashboard");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})


.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("pt-br");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("pt-br");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?condutoresdasamericas\.com\.br/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("condutores",{
		url: "/condutores",
			abstract: true,
			templateUrl: "templates/condutores-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("condutores.about_us", {
		url: "/about_us",
		cache:false,
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.carto", {
		url: "/carto",
		cache:false,
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-carto.html",
						controller: "cartoCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.dashboard", {
		url: "/dashboard",
		cache:false,
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.faqs", {
		url: "/faqs",
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.inicial", {
		url: "/inicial",
		cache:false,
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-inicial.html",
						controller: "inicialCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.menu_1", {
		url: "/menu_1",
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-menu_1.html",
						controller: "menu_1Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.menu_2", {
		url: "/menu_2",
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-menu_2.html",
						controller: "menu_2Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.parceiparceirosros", {
		url: "/parceiparceirosros",
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-parceiparceirosros.html",
						controller: "parceiparceirosrosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.parceiros", {
		url: "/parceiros",
		cache:true,
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-parceiros.html",
						controller: "parceirosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.parceiros_bookmark", {
		url: "/parceiros_bookmark",
		cache:false,
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-parceiros_bookmark.html",
						controller: "parceiros_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.parceiros_singles", {
		url: "/parceiros_singles/:id",
		cache:true,
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-parceiros_singles.html",
						controller: "parceiros_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.sobre", {
		url: "/sobre",
		cache:false,
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-sobre.html",
						controller: "sobreCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("condutores.vdeos", {
		url: "/vdeos",
		cache:false,
		views: {
			"condutores-side_menus" : {
						templateUrl:"templates/condutores-vdeos.html",
						controller: "vdeosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})


// router by user


	$urlRouterProvider.otherwise("/condutores/dashboard");
});
