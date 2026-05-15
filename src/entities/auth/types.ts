export type UserRole = "owner" | "staff" | "client"

export type PermissionKey =
  | "can_order_edit" | "can_order_delete"
  | "can_product_create" | "can_product_edit" | "can_product_delete"
  | "can_category_create" | "can_category_edit" | "can_category_delete"
  | "can_ikpu_edit" | "can_ikpu_import" | "can_ikpu_export"
  | "can_recommendation_create" | "can_recommendation_edit" | "can_recommendation_delete"
  | "can_products_import" | "can_newsletter_create"
  | "can_customer_edit" | "can_customer_delete"
  | "can_role_create" | "can_role_edit" | "can_role_delete"
  | "can_user_create" | "can_user_edit" | "can_user_delete"
  | "can_payment_connect" | "can_payment_edit" | "can_payment_delete"
  | "can_installment_connect" | "can_installment_edit" | "can_installment_delete"
  | "can_telegram_connect" | "can_telegram_edit" | "can_telegram_delete"
  | "can_ai_connect" | "can_ai_disconnect" | "can_ai_update"
  | "can_transaction_delete" | "can_telegram_user_delete"
  | "can_shipping_create" | "can_shipping_edit" | "can_shipping_delete"

export type AuthUser = {
  id: string
  first_name: string
  last_name: string
  phone_number: string
  subdomain: string
  role: UserRole
  permissions: PermissionKey[]
}

export type AuthData = {
  user: AuthUser
  access?: string
  refresh?: string
}
