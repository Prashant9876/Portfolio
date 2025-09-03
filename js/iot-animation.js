// IoT Network Animation
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('iotAnimation');
    if (!container) return;
    
    const nodeCount = 30;
    const nodes = [];
    const connections = [];
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        container.appendChild(node);
        nodes.push({
            element: node,
            x: Math.random(),
            y: Math.random(),
            vx: Math.random() * 0.002 - 0.001,
            vy: Math.random() * 0.002 - 0.001
        });
        
        // Add pulse animation to some nodes
        if (Math.random() > 0.7) {
            node.classList.add('pulse');
        }
    }
    
    // Create initial connections
    updateConnections();
    
    // Animate nodes and connections
    function animate() {
        // Update node positions
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > 1) node.vx *= -1;
            if (node.y < 0 || node.y > 1) node.vy *= -1;
            
            // Update DOM
            node.element.style.left = `${node.x * 100}%`;
            node.element.style.top = `${node.y * 100}%`;
        });
        
        // Update connections
        updateConnections();
        
        requestAnimationFrame(animate);
    }
    
    function updateConnections() {
        // Remove old connections
        connections.forEach(conn => conn.element.remove());
        connections.length = 0;
        
        // Create new connections between nearby nodes
        nodes.forEach((node1, i) => {
            nodes.slice(i + 1).forEach(node2 => {
                const dx = node2.x - node1.x;
                const dy = node2.y - node1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 0.2) { // 20% of container width
                    const angle = Math.atan2(dy, dx);
                    const connection = document.createElement('div');
                    connection.className = 'connection';
                    
                    const containerWidth = container.offsetWidth;
                    const connectionLength = distance * containerWidth;
                    
                    connection.style.width = `${connectionLength}px`;
                    connection.style.left = `${node1.x * 100}%`;
                    connection.style.top = `${node1.y * 100}%`;
                    connection.style.transform = `rotate(${angle}rad)`;
                    connection.style.opacity = 1 - (distance / 0.2);
                    
                    container.appendChild(connection);
                    connections.push({
                        element: connection,
                        node1: node1,
                        node2: node2
                    });
                }
            });
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', updateConnections);
    
    // Start animation
    animate();
});