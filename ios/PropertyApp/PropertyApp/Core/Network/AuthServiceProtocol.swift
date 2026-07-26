protocol AuthServiceProtocol {
    func login(_ data: LoginRequest) async throws -> AuthResponse
    func register(_ data: RegisterRequest) async throws -> User
}
