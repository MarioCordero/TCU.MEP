import { API } from "../lib/api"
import { useState } from "react"
import { useApi } from "../hooks/useApi"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { CMSLoginPageProps, LoginResponse } from "../types/login"
import { AlertCircle, ArrowLeft, Eye as EyeIcon, EyeOff, Lock } from "lucide-react"

export default function CMSLoginPage({ onBack, onSuccess }: CMSLoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { loading: isLoading, error, request } = useApi<LoginResponse>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await request(API.Login({ username, password }))
      if (result?.token) {
        localStorage.setItem("cms_token", result.token)
        localStorage.setItem("cms_user", JSON.stringify(result.user))
      }
      onSuccess()
    } catch {
      // error is handled by useApi
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6 text-white/70 hover:text-white hover:bg-white/10">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Button>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="p-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl w-fit mx-auto mb-4"
            >
              <Lock className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Acceso CMS</h1>
            <p className="text-white/60 text-sm">Ingresa tus credenciales para administrar el contenido</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/80">Usuario</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500 focus:ring-violet-500/20"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">Contrasena</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contrasena"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500 focus:ring-violet-500/20 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white py-6 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Ingresar al CMS
                </>
              )}
            </Button>
          </form>

          {/* Security Note */}
          <p className="text-xs text-white/40 text-center mt-6">
            Acceso restringido solo para administradores autorizados
          </p>
        </div>
      </motion.div>
    </div>
  )
}