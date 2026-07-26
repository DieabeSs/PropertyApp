
enum AppError: Error {
    case networkError
    case timeout
    case unauthorized
    case forbidden
    case serverError(statusCode: Int)
    case notFound
    case decodingFailed
    case unknown(Error?)
}
