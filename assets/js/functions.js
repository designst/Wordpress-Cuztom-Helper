jQuery.noConflict();
jQuery(function($) {
	
	// Datepicker
	$('.cuztom_datepicker').datepicker();
	
	// Colorpicker
	$('.cuztom_colorpicker').miniColors();
	
	// Tabs
	$('.cuztom_tabs').tabs();
	
	// Accordion
	$('.cuztom_accordion').accordion();
	
	// Remove current attached image
	$('.cuztom_td').on( 'click', '.cuztom_remove_image', function(){
		$('.cuztom_preview').html('');
		$('.cuztom_hidden').val('');
		$(this).hide();
		
		return false;
	});
	
	// Upload image
	$('.cuztom_td').on( 'click', '.cuztom_upload', function() {
		parent		= $(this).closest('.cuztom_td');
		
	    uploadID 	= parent.find('.cuztom_hidden');
	    spanID 		= parent.find('.cuztom_preview');		
	    formfield 	= parent.find('.cuztom_hidden').attr('name');
	    
		tb_show( '', 'media-upload.php?type=image&TB_iframe=true&post_id=0' );
		
		window.send_to_editor = function( html ) {
			// Add image source to the hidden field
		    img = $(html).find('img');
		    uploadID.val( img.attr('src') );

			// Add the image to the preview
			html = $(html).find('img');
		    spanID.html( html );

			// Close Wordpress media popup
			tb_remove();
		}
	    
		return false;
	});
	
	// Repeatable
	$('.cuztom_repeatable_wrap, .cuztom_bundle_wrap').sortable();
	
	$('.cuztom_helper').on( 'click', '.remove_repeatable', function() {
		var that = $(this),
			field = that.closest('.cuztom_field'),
			wrap = that.closest('.cuztom_repeatable_wrap'),
			fields = wrap.find('.cuztom_field').length;
		
		if( fields > 1 ) { field.remove(); }
		if( fields == 2 ){ wrap.find('.cuztom_field').find('.remove_repeatable').remove(); }
	});
	
	$('.cuztom_td').on( 'click', '.cuztom_add_field', function() {
		// Set some variables
		var parent = $(this).closest('.cuztom_td'),
			wrap = $('.cuztom_repeatable_wrap', parent),
			field = $('.cuztom_field:last', wrap),
			first = $('.cuztom_field:first', parent),
			handle = '<div class="handle_repeatable"></div>',
			remover = '<div class="remove_repeatable"></div>',
			new_field = field.clone(true);
		
		// Add the new field
		new_field.find('input, textarea, select').val('').removeAttr('selected');
		new_field.appendTo(wrap);
		
		$('.cuztom_field', parent).each(function( index, item ) {
			if( $('.handle_repeatable', item ).length == 0 ) { $(item).prepend( handle ); }
			if( $('.remove_repeatable', item ).length == 0 ) { $(item).append( remover ); }
		});
		
		return false;
	});
	
	// Bundles
	$('.cuztom_helper').on( 'click', '.remove_bundle', function() {
		var that = $(this),
			bundle = that.closest('.cuztom_bundle'),
			wrap = that.closest('.cuztom_bundle_wrap'),
			bundles = wrap.find('.cuztom_bundle').length;
		
		if( bundles > 1 ) { bundle.remove(); }
		if( bundles == 2 ){ wrap.find('.cuztom_bundle').find('.remove_bundle').remove(); }
	});
	
	$('.cuztom_helper').on( 'click', '.cuztom_add_bundle', function() {
		// Set some variables
		var parent = $(this).closest('.cuztom_helper'),
			wrap = $('.cuztom_bundle_wrap', parent),
			bundle = $('.cuztom_bundle:last', wrap),
			first = $('.cuztom_bundle:first', parent),
			field = $('.cuztom_input:first', bundle),
			handle = '<div class="handle_repeatable"></div>',
			remover = '<div class="remove_repeatable"></div>',
			name = field.attr('name'),
			new_bundle = bundle.clone(true);
		
		// Add the new bundle
		new_bundle.find('input, textarea, select').val('').removeAttr('selected');
		new_bundle.appendTo(wrap);
		
		$('.cuztom_bundle', parent).each(function( index, item ) {
			if( $('.handle_bundle', item ).length == 0 ) { $(item).prepend( handle ); }
			if( $('.remove_bundle', item ).length == 0 ) { $(item).append( remover ); }
		});
		
		return false;
	});
	
});