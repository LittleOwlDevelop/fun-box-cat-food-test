module.exports = function(grunt) {
	grunt.initConfig({
		copy: {
			jquery: {
				files: [
				// includes files within path
				//{expand: true, cwd: 'bower_components/jquery/dist/jquery.min.js', src: ['**'], dest: 'public_html/js/'},
				{expand: true, flatten: true, src: ['bower_components/jquery/dist/jquery.min.js'], dest: 'public_html/plugins/jquery/', filter: 'isFile'},
				]
			},
			bootstrap: {
				files: [
				// includes files within path
				//{expand: true, src: ['path/*'], dest: 'public_html/dest/', filter: 'isFile'},
			
				// includes files within path and its sub-directories
				//{expand: true, src: ['bower_components/bootstrap/dist/**'], dest: 'public_html/bootstrap/'},
				{expand: true, flatten: true, src: ['bower_components/bootstrap/dist/css/**'], dest: 'public_html/bootstrap/css/', filter: 'isFile'},
				{expand: true, flatten: true, src: ['bower_components/bootstrap/dist/js/**'], dest: 'public_html/bootstrap/js/', filter: 'isFile'},
				{expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/**'], dest: 'public_html/bootstrap/fonts/', filter: 'isFile'},
				
				// makes all src relative to cwd
				//{expand: true, cwd: 'path/', src: ['**'], dest: 'public_html/dest/'},
			
				// flattens results to a single level
				//{expand: true, flatten: true, src: ['path/**'], dest: 'public_html/bootstrap/', filter: 'isFile'},
				]
			},
			slick_carousel: {
				files: [
				{expand: true, flatten: true, src: ['bower_components/slick-carousel/slick/ajax-loader.gif'], dest: 'public_html/plugins/', filter: 'isFile'},
				{expand: true, flatten: true, src: ['bower_components/slick-carousel/slick/config.rb'], dest: 'public_html/plugins/', filter: 'isFile'},
				{expand: true, flatten: true, src: ['bower_components/slick-carousel/slick/fonts/**'], dest: 'public_html/fonts/', filter: 'isFile'},
				]
			},
			lightgallery: {
				files: [
				{expand: true, flatten: true, src: ['bower_components/lightgallery/dist/fonts/**'], dest: 'public_html/fonts/', filter: 'isFile'},
				{expand: true, flatten: true, src: ['bower_components/lightgallery/dist/img/**'], dest: 'public_html/img/', filter: 'isFile'},
				]
			},	
				
		},
		concat: {
			js: {
				src: 
				[
					'bower_components/scrollreveal/dist/scrollreveal.min.js',
					'bower_components/afterlag-js/dist/jquery.afterlag.min.js',
					'bower_components/slick-carousel/slick/slick.min.js',
					'bower_components/lightgallery/dist/js/lightgallery.min.js',
					'bower_components/lg-fullscreen/dist/lg-fullscreen.min.js',
					'bower_components/lg-zoom/dist/lg-zoom.min.js',
					'bower_components/readmore-js/readmore.min.js',
					'bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js',
					'bower_components/quicksand/jquery.quicksand.min.js',
					
					
				],
				dest: 'public_html/plugins/plugins.js',
			},
			css: {
				src:
				[
					'bower_components/lightgallery/dist/css/*.min.css',
					'bower_components/slick-carousel/slick/slick.css',
					'bower_components/perfect-scrollbar/css/perfect-scrollbar.min',
					//'bower_components/slick-carousel/slick/slick-theme.css',
				],
				dest: 'public_html/plugins/plugins.css',
			},
		}
	});
	
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.registerTask('default', ['concat']);
	grunt.registerTask('default', ['copy']);
}