import Foundation

@MainActor
final class LoginViewModel: ObservableObject {
    @Published var email = ""
    @Published var password = ""
    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var isLoggedIn = false
    
    private let authService: AuthServiceProtocol
    
    init(authService: AuthServiceProtocol = AuthService.shared) {
         self.authService = authService
     }
    
    func login() async {
        isLoading = true
        errorMessage = nil
        
        do {
            let response = try await authService.login(LoginRequest(email: email, password: password))
            KeychainService.shared.saveToken(response.accessToken)
            isLoggedIn = true
        } catch APIError.unauthorized {
            errorMessage = "Invalid email or password"
        } catch {
            errorMessage = "Something went wrong. Try again."
        }
        isLoading = false

    }
}
