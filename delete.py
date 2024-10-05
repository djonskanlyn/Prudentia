# @api_view(['POST'])
# def create_pr_review(request):
#     try:
#         # Get the `returnId` and `baseURL` from the request data
#         return_id = request.data.get('returnId')
#         base_url = request.data.get('baseURL')

#         if not base_url:
#             return Response({'error': 'Base URL is required.'}, status=status.HTTP_400_BAD_REQUEST)

#         # Fetch the ScheduledFact instance using return_id
#         return_instance = ScheduledFact.objects.get(id=return_id)

#         # Check if a PRReview already exists for this returnId
#         if PRReviewTable.objects.filter(returnId=return_instance).exists():
#             return Response({'error': 'A PR Review already exists for this return ID.'}, status=status.HTTP_400_BAD_REQUEST)

#         # Create a new PRReviewTable instance
#         pr_review = PRReviewTable.objects.create(returnId=return_instance)

#         # Append 'return-with-averages/' to the base URL and fetch measure data
#         measure_response = requests.get(f'{base_url}pr-reviews/return-with-averages/?returnId={return_id}')
        
#         if measure_response.status_code != 200:
#             return Response({'error': 'Error fetching measures from the API.'}, status=status.HTTP_400_BAD_REQUEST)

#         measure_data = measure_response.json()

#         # Create PRReviewMeasure entries for the created PRReviewTable
#         for measure in measure_data:
#             PRReviewMeasure.objects.create(
#                 pr_review=pr_review,
#                 source=measure['source'],
#                 measure=measure['measure'],
#                 current_Q0=measure.get('current_Q0'),
#                 prior_Q1=measure.get('prior_Q1'),
#                 prior_Q2=measure.get('prior_Q2'),
#                 prior_Q3=measure.get('prior_Q3'),
#                 prior_Q4=measure.get('prior_Q4'),
#                 perc_diff_pq=measure.get('perc_diff_pq'),
#                 perc_diff_py=measure.get('perc_diff_py'),
#                 average=measure.get('average'),
#                 comments=None  # Set comments to NULL
#             )

#         # Serialize and return the created PRReviewTable instance
#         serializer = PRReviewTableSerializer(pr_review)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     except ScheduledFact.DoesNotExist:
#         return Response({'error': 'ScheduledFact not found.'}, status=status.HTTP_404_NOT_FOUND)

#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)