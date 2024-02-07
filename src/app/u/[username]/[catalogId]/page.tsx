import React from 'react';

export default function ViewCatalog({ params }: { params: { username: string; catalogId: string } }) {
  return (
    <div>
      {params.username}: {params.catalogId}
    </div>
  );
}
