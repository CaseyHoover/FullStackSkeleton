import SwiftUI

@main
struct HealthDashApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    var body: some View {
        Text("HealthDash")
            .font(.largeTitle)
    }
}
