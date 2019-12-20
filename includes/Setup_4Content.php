<?php

class Setup_Content{
  static function register_post_types() {
	register_post_type( 'Content',
			array(
				'labels' => array(
					'name' => ( 'Content' ),
					'singular_name' => ( 'Content' ),
					'add_new' =>  ( 'Add Content'),
					'new_item' => ( 'New Content' ),
					'view_item' => ( 'View Content' ),
					'add_new_item' => ( 'Add New Content' ),
					'edit_item' => ( 'Edit Content' ),
					'not_found' => ( 'Not found Content' ),
				),
				  'public' => true,
				  'has_archive' => false,
				  'show_in_menu' => 'signage',
				  'show_in_admin_bar' => true,
	  			  'supports' => array( 'title' ),
				  'taxonomies' => array(),
				  'rewrite' => false,			  
			)
	);
}

  static function add_content_meta_box() {

	add_meta_box(
		'content_upload3',
		'Upload Content', //text in page
		array( __CLASS__, 'content_metabox' ), //call function after
		'Content', //call slug on register_post
		'normal',
		'low'
	);

}

  static function content_metabox(  ) {
    wp_enqueue_media();
	?>

<table class="form-table">
		<tbody>
			<tr>
				<th scope="row">
					<label for="slide_bg_image_image"><?php esc_html_e( 'Upload Content' ); ?></label>
				</th>
				<td>
				<form action="#" id="frmPost">
				<div id="drop_file_zone" ondrop="upload_file(event)" ondragover="return false">
						<div id="drag_upload_file">
						   <img src="" id="getImage" style="height: 400px"/>
						  <p><input type="button" id="btnImage" name="btnImage" value="Select File"></p>
					  </div>
			  </div>
		</form>
			<p class="slide_file_empty_message"><?php _e( 'For the best results use an image that is at least 1920 x 1080 pixels (landscape), or 1080 x 1920 pixels (portrait).', 'foyer' ); ?></p>
					</div>
				</td>
			</tr>
		</tbody>
	</table>

<?php
  }

}
