module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// minify html
		htmlmin: {
		    dist: {
		        options: {
		            removeComments: true,
		            collapseWhitespace: true
		        },
		        files: {
		            // destination : source
		            'dist/index.html': 'index.html',
		        }
		    },
		}, // end html minify
		sass: {
			dist: {
				 options: {
		            style: 'compressed',
		            sourcemap: 'none',
		            noCache: true
		        },
				files: {
					'public/asserts/master.css' : 'sass/master.scss'
				}
			}
		}, // end convert sass to css

		//concat js
		concat:{
			js: {
				src: ['scripts/*.js', '!scripts/main.js'],
				dest: 'scripts/main.js'
			}
		},
		// minify / uglify js
		uglify: {
		    my_target: {
		        files: {
		            'dist/js/main.min.js': 'scripts/main.js',
		            'js/main.min.js': 'scripts/main.js'
		        }
		    }
		}, // end js minify

		watch: {
			html: {
		        files: 'index.html',
		        tasks: ['htmlmin'],
		    },
			js: {
		        files: 'scripts/main.js',
		        tasks: ['uglify'],
		    },
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		}// end watch
	});
	grunt.loadNpmTasks('grunt-contrib-htmlmin'); // html minify
	grunt.loadNpmTasks('grunt-contrib-sass'); // convert sass to css
	grunt.loadNpmTasks('grunt-contrib-concat'); // concat files
	grunt.loadNpmTasks('grunt-contrib-uglify'); // js uglify
	grunt.loadNpmTasks('grunt-contrib-watch');// watch for changes

	grunt.registerTask('default',['htmlmin','sass', 'concat','uglify','watch']);
}