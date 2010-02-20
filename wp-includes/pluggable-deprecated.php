<?php
/**
 * Deprecated pluggable functions from past WordPress versions. You shouldn't use these
 * functions and look for the alternatives instead. The functions will be removed in a
 * later version.
 *
 * Deprecated warnings are also thrown if one of these functions is being defined by a plugin.
 *
 * @package WordPress
 * @subpackage Deprecated
 * @see pluggable.php
 */

/*
 * Deprecated functions come here to die.
 */

if ( !function_exists('wp_setcookie') ) :
/**
 * Sets a cookie for a user who just logged in. This function is deprecated.
 *
 * @since 1.5
 * @deprecated 2.5
 * @deprecated Use wp_set_auth_cookie()
 * @see wp_set_auth_cookie()
 *
 * @param string $username The user's username
 * @param string $password Optional. The user's password
 * @param bool $already_md5 Optional. Whether the password has already been through MD5
 * @param string $home Optional. Will be used instead of COOKIEPATH if set
 * @param string $siteurl Optional. Will be used instead of SITECOOKIEPATH if set
 * @param bool $remember Optional. Remember that the user is logged in
 */
function wp_setcookie($username, $password = '', $already_md5 = false, $home = '', $siteurl = '', $remember = false) {
	_deprecated_function( __FUNCTION__, '2.5', 'wp_set_auth_cookie()' );
	$user = get_userdatabylogin($username);
	wp_set_auth_cookie($user->ID, $remember);
}
else :
	_deprecated_function( 'wp_setcookie', '2.5', 'wp_set_auth_cookie()' );
endif;

if ( !function_exists('wp_clearcookie') ) :
/**
 * Clears the authentication cookie, logging the user out. This function is deprecated.
 *
 * @since 1.5
 * @deprecated 2.5
 * @deprecated Use wp_clear_auth_cookie()
 * @see wp_clear_auth_cookie()
 */
function wp_clearcookie() {
	_deprecated_function( __FUNCTION__, '2.5', 'wp_clear_auth_cookie()' );
	wp_clear_auth_cookie();
}
else :
	_deprecated_function( 'wp_clearcookie', '2.5', 'wp_clear_auth_cookie()' );
endif;

if ( !function_exists('wp_get_cookie_login') ):
/**
 * Gets the user cookie login. This function is deprecated.
 *
 * This function is deprecated and should no longer be extended as it won't be
 * used anywhere in WordPress. Also, plugins shouldn't use it either.
 *
 * @since 2.0.3
 * @deprecated 2.5
 * @deprecated No alternative
 *
 * @return bool Always returns false
 */
function wp_get_cookie_login() {
	_deprecated_function( __FUNCTION__, '2.5' );
	return false;
}
else :
	_deprecated_function( 'wp_get_cookie_login', '2.5' );
endif;

if ( !function_exists('wp_login') ) :
/**
 * Checks a users login information and logs them in if it checks out. This function is deprecated.
 *
 * Use the global $error to get the reason why the login failed. If the username
 * is blank, no error will be set, so assume blank username on that case.
 *
 * Plugins extending this function should also provide the global $error and set
 * what the error is, so that those checking the global for why there was a
 * failure can utilize it later.
 *
 * @since 1.2.2
 * @deprecated Use wp_signon()
 * @global string $error Error when false is returned
 *
 * @param string $username User's username
 * @param string $password User's password
 * @param bool $deprecated Not used
 * @return bool False on login failure, true on successful check
 */
function wp_login($username, $password, $deprecated = '') {
	_deprecated_function( __FUNCTION__, '2.5', 'wp_signon()' );
	global $error;

	$user = wp_authenticate($username, $password);

	if ( ! is_wp_error($user) )
		return true;

	$error = $user->get_error_message();
	return false;
}
else :
	_deprecated_function( 'wp_login', '2.5', 'wp_signon()' );
endif;