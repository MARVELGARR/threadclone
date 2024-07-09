const Loading = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center space-y-4">
                <div className="text-2xl font-bold text-primary">Loading...</div>
                <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-primary border-t-transparent" />
            </div>
        </div>
    );
}
 
export default Loading;