final class AuthService: AuthServiceProtocol {
    static let shared = AuthService()
    private init() {}
    
    func register(_ data: RegisterRequest) async throws -> User {
        try await APIClient.shared.request(path: "/auth/register",method: "POST",body: data)
    }
    
    func login(_ data: LoginRequest) async throws -> AuthResponse {
        try await APIClient.shared.request(path: "/auth/login",method: "POST",body: data)
    }
}
