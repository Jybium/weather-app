function extractDateTime() {
    // Get current date and time
    const currentDate = new Date();
    
    // Extract date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    // Extract time components
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    
    // Get day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[currentDate.getDay()];
    
    // Return extracted date, time, and day
    return {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}:${seconds}`,
        day: dayOfWeek
    };
}

export default extractDateTime;

// Example usage:
// const { date, time, day } = extractDateTime();

