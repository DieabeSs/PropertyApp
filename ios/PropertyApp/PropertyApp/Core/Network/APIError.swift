enum APIError: Error {
    case invalidURL
    case requestFailed(Int)
    case decodingFailed
    case unauthorized
    case forbidden
    case notFound
}