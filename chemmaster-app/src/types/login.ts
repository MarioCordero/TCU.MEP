export type CMSLoginPageProps = {
  onBack: () => void
  onSuccess: () => void
}

export type LoginResponse = {
  success: boolean
  message: string
  token: string
  user: {
    id: number
    username: string
    full_name: string
    last_login: string
    created_at: string
  }
}