-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2024 at 11:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_menu`
--

CREATE TABLE `admin_menu` (
  `id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `order` int(11) NOT NULL DEFAULT 0,
  `title` varchar(50) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `uri` varchar(255) DEFAULT NULL,
  `permission` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_menu`
--

INSERT INTO `admin_menu` (`id`, `parent_id`, `order`, `title`, `icon`, `uri`, `permission`, `created_at`, `updated_at`) VALUES
(1, 0, 1, 'Dashboard', 'icon-chart-bar', '/', NULL, NULL, NULL),
(2, 0, 2, 'Admin', 'icon-server', '', NULL, NULL, NULL),
(3, 2, 3, 'Users', 'icon-users', 'auth/users', NULL, NULL, NULL),
(4, 2, 4, 'Roles', 'icon-user', 'auth/roles', NULL, NULL, NULL),
(5, 2, 5, 'Permission', 'icon-ban', 'auth/permissions', NULL, NULL, NULL),
(6, 2, 6, 'Menu', 'icon-bars', 'auth/menu', NULL, NULL, NULL),
(7, 2, 7, 'Operation log', 'icon-history', 'auth/logs', NULL, NULL, NULL),
(8, 0, 8, 'Users', 'icon-users', 'users', NULL, NULL, NULL),
(9, 0, 10, 'Products', 'icon-boxes', 'products', NULL, '2024-03-19 19:20:26', '2024-03-19 19:21:04'),
(10, 0, 9, 'Categories', 'icon-address-card', 'categories', NULL, '2024-03-19 19:23:22', '2024-03-19 19:23:22'),
(11, 0, 11, 'Orders', 'icon-box-open', 'order-products', NULL, '2024-03-19 19:24:16', '2024-03-19 19:24:16');

-- --------------------------------------------------------

--
-- Table structure for table `admin_operation_log`
--

CREATE TABLE `admin_operation_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `method` varchar(10) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `input` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_operation_log`
--

INSERT INTO `admin_operation_log` (`id`, `user_id`, `path`, `method`, `ip`, `input`, `created_at`, `updated_at`) VALUES
(1, 1, 'admin', 'GET', '::1', '[]', '2024-03-19 19:12:20', '2024-03-19 19:12:20'),
(2, 1, 'admin', 'GET', '::1', '[]', '2024-03-19 19:14:07', '2024-03-19 19:14:07'),
(3, 1, 'admin/auth/users', 'GET', '::1', '[]', '2024-03-19 19:14:20', '2024-03-19 19:14:20'),
(4, 1, 'admin/auth/users', 'GET', '::1', '[]', '2024-03-19 19:15:39', '2024-03-19 19:15:39'),
(5, 1, 'admin/auth/users', 'GET', '::1', '[]', '2024-03-19 19:18:03', '2024-03-19 19:18:03'),
(6, 1, 'admin/users', 'GET', '::1', '[]', '2024-03-19 19:18:14', '2024-03-19 19:18:14'),
(7, 1, 'admin/users', 'GET', '::1', '[]', '2024-03-19 19:19:04', '2024-03-19 19:19:04'),
(8, 1, 'admin/auth/menu', 'GET', '::1', '[]', '2024-03-19 19:19:14', '2024-03-19 19:19:14'),
(9, 1, 'admin/auth/menu', 'POST', '::1', '{\"parent_id\":\"0\",\"search_terms\":null,\"title\":\"products\",\"icon\":\"icon-boxes\",\"uri\":\"products\",\"roles\":[null],\"permission\":null,\"_token\":\"qesU4ZK9lXK1oDhCzF8OJEfn9yJW3GNbKQT1iwjr\"}', '2024-03-19 19:20:26', '2024-03-19 19:20:26'),
(10, 1, 'admin/auth/menu', 'GET', '::1', '[]', '2024-03-19 19:20:26', '2024-03-19 19:20:26'),
(11, 1, 'admin/auth/menu', 'GET', '::1', '[]', '2024-03-19 19:20:30', '2024-03-19 19:20:30'),
(12, 1, 'admin/auth/menu/9/edit', 'GET', '::1', '[]', '2024-03-19 19:20:39', '2024-03-19 19:20:39'),
(13, 1, 'admin/auth/menu/9', 'PUT', '::1', '{\"parent_id\":\"0\",\"search_terms\":null,\"title\":\"Products\",\"icon\":\"icon-boxes\",\"uri\":\"products\",\"roles\":[null],\"permission\":null,\"_token\":\"qesU4ZK9lXK1oDhCzF8OJEfn9yJW3GNbKQT1iwjr\",\"_method\":\"PUT\"}', '2024-03-19 19:21:04', '2024-03-19 19:21:04'),
(14, 1, 'admin/auth/menu', 'GET', '::1', '[]', '2024-03-19 19:21:04', '2024-03-19 19:21:04'),
(15, 1, 'admin/auth/menu', 'GET', '::1', '[]', '2024-03-19 19:21:20', '2024-03-19 19:21:20'),
(16, 1, 'admin/auth/menu/9/edit', 'GET', '::1', '[]', '2024-03-19 19:21:30', '2024-03-19 19:21:30'),
(17, 1, 'admin/auth/menu', 'GET', '::1', '[]', '2024-03-19 19:22:10', '2024-03-19 19:22:10'),
(18, 1, 'admin/auth/menu', 'POST', '::1', '{\"parent_id\":\"0\",\"search_terms\":null,\"title\":\"Categories\",\"icon\":\"icon-address-card\",\"uri\":\"categories\",\"roles\":[null],\"permission\":null,\"_token\":\"qesU4ZK9lXK1oDhCzF8OJEfn9yJW3GNbKQT1iwjr\"}', '2024-03-19 19:23:22', '2024-03-19 19:23:22'),
(19, 1, 'admin/auth/menu', 'GET', '::1', '[]', '2024-03-19 19:23:23', '2024-03-19 19:23:23'),
(20, 1, 'admin/auth/menu', 'POST', '::1', '{\"parent_id\":\"0\",\"search_terms\":null,\"title\":\"Orders\",\"icon\":\"icon-box-open\",\"uri\":\"order-products\",\"roles\":[null],\"permission\":null,\"_token\":\"qesU4ZK9lXK1oDhCzF8OJEfn9yJW3GNbKQT1iwjr\"}', '2024-03-19 19:24:16', '2024-03-19 19:24:16'),
(21, 1, 'admin/auth/menu', 'GET', '::1', '[]', '2024-03-19 19:24:17', '2024-03-19 19:24:17'),
(22, 1, 'admin/auth/menu', 'GET', '::1', '[]', '2024-03-19 19:24:19', '2024-03-19 19:24:19'),
(23, 1, 'admin/auth/menu', 'GET', '::1', '[]', '2024-03-19 19:24:56', '2024-03-19 19:24:56'),
(24, 1, 'admin/users', 'GET', '::1', '[]', '2024-03-19 19:24:59', '2024-03-19 19:24:59'),
(25, 1, 'admin/categories', 'GET', '::1', '[]', '2024-03-19 19:25:01', '2024-03-19 19:25:01'),
(26, 1, 'admin/products', 'GET', '::1', '[]', '2024-03-19 19:25:01', '2024-03-19 19:25:01'),
(27, 1, 'admin/order-products', 'GET', '::1', '[]', '2024-03-19 19:25:03', '2024-03-19 19:25:03'),
(28, 1, 'admin/categories', 'GET', '::1', '[]', '2024-03-19 19:25:03', '2024-03-19 19:25:03'),
(29, 1, 'admin/categories', 'GET', '::1', '[]', '2024-03-19 19:30:33', '2024-03-19 19:30:33'),
(30, 1, 'admin/products', 'GET', '::1', '[]', '2024-03-19 19:30:36', '2024-03-19 19:30:36'),
(31, 1, 'admin/categories', 'GET', '::1', '[]', '2024-03-19 19:30:36', '2024-03-19 19:30:36'),
(32, 1, 'admin/products', 'GET', '::1', '[]', '2024-03-19 19:30:38', '2024-03-19 19:30:38'),
(33, 1, 'admin/order-products', 'GET', '::1', '[]', '2024-03-19 19:30:39', '2024-03-19 19:30:39'),
(34, 1, 'admin/categories', 'GET', '::1', '[]', '2024-03-19 19:30:39', '2024-03-19 19:30:39'),
(35, 1, 'admin/products', 'GET', '::1', '[]', '2024-03-19 19:30:41', '2024-03-19 19:30:41'),
(36, 1, 'admin/users', 'GET', '::1', '[]', '2024-03-19 19:30:41', '2024-03-19 19:30:41'),
(37, 1, 'admin', 'GET', '127.0.0.1', '[]', '2024-03-26 15:38:32', '2024-03-26 15:38:32'),
(38, 1, 'admin/users', 'GET', '127.0.0.1', '[]', '2024-03-26 15:38:38', '2024-03-26 15:38:38'),
(39, 1, 'admin/categories', 'GET', '127.0.0.1', '[]', '2024-03-26 15:38:40', '2024-03-26 15:38:40'),
(40, 1, 'admin/products', 'GET', '127.0.0.1', '[]', '2024-03-26 15:38:41', '2024-03-26 15:38:41'),
(41, 1, 'admin/order-products', 'GET', '127.0.0.1', '[]', '2024-03-26 15:38:42', '2024-03-26 15:38:42'),
(42, 1, 'admin/products', 'GET', '127.0.0.1', '[]', '2024-03-26 15:38:44', '2024-03-26 15:38:44'),
(43, 1, 'admin/products/1/edit', 'GET', '127.0.0.1', '[]', '2024-03-26 15:38:52', '2024-03-26 15:38:52'),
(44, 1, 'admin', 'GET', '127.0.0.1', '[]', '2024-03-26 15:56:24', '2024-03-26 15:56:24'),
(45, 1, 'admin/users', 'GET', '127.0.0.1', '[]', '2024-03-26 15:56:33', '2024-03-26 15:56:33'),
(46, 1, 'admin/categories', 'GET', '127.0.0.1', '[]', '2024-03-26 15:56:34', '2024-03-26 15:56:34'),
(47, 1, 'admin/products', 'GET', '127.0.0.1', '[]', '2024-03-26 15:56:36', '2024-03-26 15:56:36'),
(48, 1, 'admin/order-products', 'GET', '127.0.0.1', '[]', '2024-03-26 15:56:38', '2024-03-26 15:56:38'),
(49, 1, 'admin/products', 'GET', '127.0.0.1', '[]', '2024-03-26 15:56:40', '2024-03-26 15:56:40'),
(50, 1, 'admin/categories', 'GET', '127.0.0.1', '[]', '2024-03-26 15:56:43', '2024-03-26 15:56:43'),
(51, 1, 'admin', 'GET', '127.0.0.1', '[]', '2024-03-26 16:11:40', '2024-03-26 16:11:40');

-- --------------------------------------------------------

--
-- Table structure for table `admin_permissions`
--

CREATE TABLE `admin_permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `http_method` varchar(255) DEFAULT NULL,
  `http_path` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_permissions`
--

INSERT INTO `admin_permissions` (`id`, `name`, `slug`, `http_method`, `http_path`, `created_at`, `updated_at`) VALUES
(1, 'All permission', '*', '', '*', NULL, NULL),
(2, 'Dashboard', 'dashboard', 'GET', '/', NULL, NULL),
(3, 'Login', 'auth.login', '', '/auth/login\r\n/auth/logout', NULL, NULL),
(4, 'User setting', 'auth.setting', 'GET,PUT', '/auth/setting', NULL, NULL),
(5, 'Auth management', 'auth.management', '', '/auth/roles\r\n/auth/permissions\r\n/auth/menu\r\n/auth/logs', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin_roles`
--

CREATE TABLE `admin_roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_roles`
--

INSERT INTO `admin_roles` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'administrator', '2024-03-19 19:11:38', '2024-03-19 19:11:38');

-- --------------------------------------------------------

--
-- Table structure for table `admin_role_menu`
--

CREATE TABLE `admin_role_menu` (
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_role_menu`
--

INSERT INTO `admin_role_menu` (`role_id`, `menu_id`, `created_at`, `updated_at`) VALUES
(1, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin_role_permissions`
--

CREATE TABLE `admin_role_permissions` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_role_permissions`
--

INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin_role_users`
--

CREATE TABLE `admin_role_users` (
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_role_users`
--

INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(190) NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`, `name`, `avatar`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$jvbVV.PFMMTUeo9CFx6OwuSzdi.igSMfhTwStapfJR2BmkCuDJWAi', 'Administrator', NULL, NULL, '2024-03-19 19:11:38', '2024-03-19 19:11:38');

-- --------------------------------------------------------

--
-- Table structure for table `admin_user_permissions`
--

CREATE TABLE `admin_user_permissions` (
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_title` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2016_01_04_173148_create_admin_tables', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2023_08_23_163325_create_products_table', 2),
(8, '2024_01_22_161940_create_carts_table', 2),
(9, '2024_01_25_211152_create_orders_table', 2),
(10, '2024_01_25_212146_order_product', 2),
(11, '2024_01_09_175019_category', 3);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `paid_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `name`, `email`, `phone`, `address`, `city`, `payment_method`, `payment_status`, `transaction_id`, `total`, `created_at`, `updated_at`, `user_id`, `paid_amount`) VALUES
(1, 'Yuzay', 'messcalitto@yahoo.com', '3094859348', 'Address 2', 'Ruse', 'Stripe', 'PAID', 'ch_3P7FPDHi7psR8Gxr1pIjBF37', NULL, '2024-04-19 08:13:28', '2024-04-19 08:15:02', 1, 720.00),
(2, 'Yuzay', 'messcalitto@yahoo.com', '3094859348', 'Address 2', 'Ruse', 'Stripe', 'PAID', 'ch_3P7FRhHi7psR8Gxr1X7lmz00', NULL, '2024-04-19 08:17:26', '2024-04-19 08:17:34', 1, 720.00),
(3, 'Yuzay', 'messcalitto@yahoo.com', '3094859348', 'Address 2', 'Ruse', 'Stripe', 'PAID', 'ch_3P7FSoHi7psR8Gxr0wDe1i2v', NULL, '2024-04-19 08:18:29', '2024-04-19 08:18:43', 1, 720.00),
(4, 'Yuzay', 'messcalitto@yahoo.com', '3094859348', 'Address 2', 'Ruse', 'Stripe', 'PAID', 'ch_3P7FTcHi7psR8Gxr0MN0pLh9', NULL, '2024-04-19 08:19:21', '2024-04-19 08:19:33', 1, 720.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `quantity` int(10) UNSIGNED DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`id`, `order_id`, `product_id`, `user_id`, `title`, `quantity`, `price`, `created_at`, `updated_at`, `image`, `status`) VALUES
(1, 4, 2, 1, 'Man\'s shirt 2', 5, 120.00, '2024-04-19 08:19:33', '2024-04-19 08:19:33', 'images/p2.png', 'PAID'),
(2, 4, 2, 1, 'Man\'s shirt 2', 1, 120.00, '2024-04-19 08:19:33', '2024-04-19 08:19:33', 'images/p2.png', 'PAID');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `short_notes` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT 0.00,
  `quantity` int(11) DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `short_notes`, `price`, `discount_price`, `quantity`, `image`, `user_id`, `created_at`, `updated_at`, `category_id`) VALUES
(1, 'Men\'s shirt', 'Men\'s shirt description', 'Men\'s shirt', 100.00, 0.00, 10, '[\"images/p1.png\"]', 1, NULL, NULL, 1),
(2, 'Man\'s shirt 2', 'Man\'s shirt 2 description', 'Man\'s shirt 2', 120.00, 0.00, 10, '[\"images/p2.png\"]', 1, NULL, NULL, 1),
(3, 'Womеn\'s dress', 'Womеn\'s dress description', 'Womеn\'s dress', 120.00, 0.00, 10, '[\"images/p3.png\"]', 1, NULL, NULL, 1),
(4, 'Womеn\'s dress 2', 'Womеn\'s dress 2 description', 'Womеn\'s dress 2', 200.00, 0.00, 10, '[\"images/p4.png\"]', 1, NULL, NULL, 1),
(6, 'Womеn\'s dress 3', 'Womеn\'s dress 3 description', 'Womеn\'s dress 3', 135.00, 0.00, 10, '[\"images/p6.png\"]', 1, NULL, NULL, 1),
(7, 'Womеn\'s dress 4', 'Womеn\'s dress 4 description', 'Womеn\'s dress 4', 115.00, 0.00, 10, '[\"images/p7.png\"]', 1, NULL, NULL, 1),
(8, 'Меn\'s shirt 8', 'Меn\'s shirt 8 description', 'Men\'s dress 8', 115.00, 0.00, 10, '[\"images/p8.png\"]', 1, NULL, NULL, 1),
(9, 'Меn\'s shirt 9', 'Меn\'s shirt 9 description', 'Men\'s dress 9', 305.00, 0.00, 10, '[\"images/p9.png\"]', 1, NULL, NULL, 1),
(10, 'Меn\'s shirt 10', 'Меn\'s shirt 10 description', 'Men\'s dress 10', 185.00, 0.00, 10, '[\"images/p10.png\"]', 1, NULL, NULL, 1),
(11, 'Меn\'s shirt 11', 'Меn\'s shirt 11 description', 'Men\'s dress 11', 115.00, 0.00, 10, '[\"images/p11.png\"]', 1, NULL, NULL, 1),
(12, 'Women\'s dress 12', 'Women\'s dress 12 desc', 'Women\'s dress 12', 125.00, 0.00, 10, '[\"images/p12.png\"]', 1, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Yuzay', 'messcalitto@yahoo.com', '2024-04-15 09:05:54', '$2y$10$IetQQtsjoJ5gwI/75NovU.gHkDqdWmoq5X75BmxU730yP7VQ9bQfK', '86Afe86Ni3za8jwfj24f9xhTjDrb5pD1usHnEi83UpYbUrCCjVYD7XsXW7Uu', NULL, '2024-04-15 09:05:54'),
(2, 'test', 'test0005@abv.bg', NULL, '$2y$10$Q0BB7ktjRSk1XLGTLfmooOLXwIoPZoFLKQN/1VXYP3QE80.jq6rfG', NULL, '2024-03-26 14:01:13', '2024-03-26 14:01:13'),
(3, 'test', 'test0004@abv.bg', '2024-03-26 14:23:22', '$2y$10$6ny4C9KVnEaZz91rQwkASO5o8ZWpRF391cIqI0jiBaM4NPVPjEVnC', NULL, '2024-03-26 14:21:40', '2024-03-26 14:23:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_menu`
--
ALTER TABLE `admin_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_operation_log`
--
ALTER TABLE `admin_operation_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_operation_log_user_id_index` (`user_id`);

--
-- Indexes for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_permissions_name_unique` (`name`),
  ADD UNIQUE KEY `admin_permissions_slug_unique` (`slug`);

--
-- Indexes for table `admin_roles`
--
ALTER TABLE `admin_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_roles_name_unique` (`name`),
  ADD UNIQUE KEY `admin_roles_slug_unique` (`slug`);

--
-- Indexes for table `admin_role_menu`
--
ALTER TABLE `admin_role_menu`
  ADD KEY `admin_role_menu_role_id_menu_id_index` (`role_id`,`menu_id`);

--
-- Indexes for table `admin_role_permissions`
--
ALTER TABLE `admin_role_permissions`
  ADD KEY `admin_role_permissions_role_id_permission_id_index` (`role_id`,`permission_id`);

--
-- Indexes for table `admin_role_users`
--
ALTER TABLE `admin_role_users`
  ADD KEY `admin_role_users_role_id_user_id_index` (`role_id`,`user_id`);

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_users_username_unique` (`username`);

--
-- Indexes for table `admin_user_permissions`
--
ALTER TABLE `admin_user_permissions`
  ADD KEY `admin_user_permissions_user_id_permission_id_index` (`user_id`,`permission_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_products_order_id_foreign` (`order_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_menu`
--
ALTER TABLE `admin_menu`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `admin_operation_log`
--
ALTER TABLE `admin_operation_log`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `admin_roles`
--
ALTER TABLE `admin_roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
