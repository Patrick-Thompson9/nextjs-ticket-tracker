INSERT INTO tickets (customer_id, title, description, completed, tech, created_at, updated_at)
VALUES 
    (1, 'Issue with login', 'Unable to log in with correct credentials', false, 'Tech A', now(), now()),
    (2, 'Payment processing error', 'Payment fails on checkout', false, 'Tech B', now(), now()),
    (3, 'Feature request: Dark mode', 'Would like to have a dark mode option', false, 'Tech C', now(), now()),
    (4, 'Bug in user profile update', 'Changes to user profile are not saved', true, 'Tech A', now(), now()),
    (5, 'Website loading slow', 'The website takes too long to load on mobile devices', false, 'Tech B', now(), now());